import Query from '~/src/resolvers';

describe('Resolvers', () => {
  it('should give the same name', () => {
    const me = {
      id: '122MK22',
      name: 'Assitan',
      email: 'rerer@gmail.com',
      age: '29'
    };

    const args = {};
    const ctx = {};

    const output = Query.name(me, args, ctx);

    expect(output).toEqual('Assitan');
  });
});