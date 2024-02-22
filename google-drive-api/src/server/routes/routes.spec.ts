// import { IncomingMessage, ServerResponse } from "http";
// import { Routes } from "./routes"

// describe('#Routes', () => {
//   let routes: Routes;

//   beforeEach(() => {
//     routes = new Routes()
//   })

//   const io = {
//     to: (id: any) => io,
//     emit: (event: any, message: any) => { }
//   }

//   const params = {
//     request: {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       },
//       method: '',
//       body: {}
//     },
//     response: {
//       setHeader: jest.fn(),
//       writeHead: jest.fn(),
//       end: jest.fn()
//     },
//     values: () => Object.values<any>(params)
//   }

//   it.each([
//     {
//       should: 'set store socket io instance',
//       setup: () => {
//         routes.setSocketInstance(io as any)
//       },
//       expected: () => {
//         expect(routes.io).toStrictEqual(io);
//       }
//     },
//     {
//       should: 'given an inexistend route it should choosen default route',
//       input: () => {
//         const input = { ...params }
//         input.request.method = 'inexistent';
//         input.values = () => Object.values<any>(input)
//         return input
//       },
//       setup: () => { },
//       expected: () => {
//         expect(params.response.end).toHaveBeenCalledWith('hello world');
//       }
//     },
//     {
//       should: 'it set any request with CORS enabled',
//       input: () => {
//         const input = { ...params }
//         input.request.method = 'inexistent'
//         input.values = () => Object.values<any>(input)
//         return input
//       },
//       setup: () => { },
//       expected: () => {
//         expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
//       }
//     },
//     {
//       should: 'given method OPTIONS it should choose options route',
//       input: () => {
//         const input = { ...params }
//         input.request.method = 'OPTIONS'
//         input.values = () => Object.values<any>(input)
//         return input
//       },
//       setup: () => { },
//       expected: () => {
//         expect(params.response.writeHead).toHaveBeenCalledWith(204);
//         expect(params.response.end).toHaveBeenCalled();
//       }
//     },
//     {
//       should: 'given method POST it should choose options route',
//       input: () => {
//         const input = { ...params }
//         input.request.method = 'POST'
//         input.values = () => Object.values<any>(input)
//         return input
//       },
//       setup: () => {
//         jest.spyOn(routes, 'post').mockResolvedValueOnce()
//       },
//       expected: () => {
//         expect(routes.post).toHaveBeenCalled();
//       }
//     },
//     {
//       should: 'given method GET it should choose options route',
//       input: () => {
//         const input = { ...params }
//         input.request.method = 'GET'
//         input.values = () => Object.values<any>(input)
//         return input
//       },
//       setup: () => {
//         jest.spyOn(routes, 'get').mockResolvedValueOnce()
//       },
//       expected: () => {
//         expect(routes.get).toHaveBeenCalled();
//       }
//     }
//   ])('Should $should', async ({ input, expected, setup }) => {
//     if (setup) setup();

//     if (!input) {
//       expected()
//       return;
//     }

//     await routes.handler(...(input().values() as [IncomingMessage, ServerResponse]))
//     expected()
//   })
// })