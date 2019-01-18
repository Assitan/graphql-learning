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

    const output = Query.me(me, args, ctx);
    console.log(output, 'output')


    expect(output).toEqual('Assitan');
  });
});