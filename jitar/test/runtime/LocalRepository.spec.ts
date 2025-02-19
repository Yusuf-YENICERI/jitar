
import InvalidClientId from '../../src/runtime/errors/InvalidClientId';
import ClientNotFound from '../../src/runtime/errors/ClientNotFound';

import
{
    repository, client,
    UNSEGMENTED_FILE, LOCAL_FILE, REMOTE_FILE
} from '../_fixtures/runtime/LocalRepository.fixture';

describe('runtime/LocalRepository', () =>
{
    describe('.loadModule(clientId, filename)', () =>
    {
        it('should not accept an invalid client id', () =>
        {
            const run = async () => await repository.loadModule('INVALID', '/some/file');

            expect(run).rejects.toEqual(new InvalidClientId('INVALID'));
        });

        it('should not accept an unknown client id', () =>
        {
            const run = async () => await repository.loadModule('CLIENT_9999', '/some/file');

            expect(run).rejects.toEqual(new ClientNotFound('CLIENT_9999'));
        });

        it('should return an unsegmented module file', async () =>
        {
            const result = await repository.loadModule(client.id, UNSEGMENTED_FILE);

            expect(result.content.toString()).toContain('fourthPrivateTask()');
        });

        it('should return the actual module file', async () =>
        {
            const result = await repository.loadModule(client.id, LOCAL_FILE);

            expect(result.content).toContain('firstPublicTask()');
        });

        it('should return a remote module file', async () =>
        {
            const result = await repository.loadModule(client.id, REMOTE_FILE);

            expect(result.content.toString()).toContain('runProcedure()');
        });
    });
});
