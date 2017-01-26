import Observer from '../src'

describe("Given an observer that returns valid values", () => {
    let observer : Observer<string>

    beforeEach(() => {
        observer = new Observer<string>((next, error, done) => {
            next("a");
            next("b");
            next("c");
            done();
        })
    })

    describe("When an itterator runs", async () => {
        let itterator : jest.Mock<{}>
        let promise : Promise<void>
        
        beforeEach(() => {
            itterator = jest.fn();
            promise = observer.itterate(itterator);
        });
        
        it("Then the values should be returned", async () => {
            await promise;

            expect(itterator.mock.calls).toEqual([
                ["a"],
                ["b"],
                ["c"],
            ])
        })
    })

    describe("When multiple itterators run", async () => {
        let itterator1 : jest.Mock<{}>
        let itterator2 : jest.Mock<{}>

        let promise1 : Promise<void>
        let promise2 : Promise<void>
        
        beforeEach(() => {
            itterator1 = jest.fn();
            promise1 = observer.itterate(itterator1);

            itterator2 = jest.fn();
            promise2 = observer.itterate(itterator2);
        });
        
        it("Then the values should be returned to both itterators", async () => {
            await promise1;
            await promise2;

            expect(itterator1.mock.calls).toEqual([
                ["a"],
                ["b"],
                ["c"],
            ])

            expect(itterator2.mock.calls).toEqual([
                ["a"],
                ["b"],
                ["c"],
            ])
        })
    })
})

describe("Given an observer that returns an error", () => {
    let observer : Observer<string>

    beforeEach(() => {
        observer = new Observer<string>((next, error, done) => {
            next("a");
            error("b")
        })
    })

    describe("When an itterator runs", async () => {
        let itterator : jest.Mock<{}>
        let promise : Promise<void>
        
        beforeEach(() => {
            itterator = jest.fn();
            promise = observer.itterate(itterator);
        });
        
        it("Then the error should be returned", async () => {
            try {
                await promise;
                fail("Promise should reject");
            } catch(e) {
                expect(e).toBe("b");
            }

            expect(itterator.mock.calls).toEqual([
                ["a"],
            ])
        })
    })

    describe("When multiple itterators run", async () => {
        let itterator1 : jest.Mock<{}>
        let itterator2 : jest.Mock<{}>

        let promise1 : Promise<void>
        let promise2 : Promise<void>
        
        beforeEach(() => {
            itterator1 = jest.fn();
            promise1 = observer.itterate(itterator1);

            itterator2 = jest.fn();
            promise2 = observer.itterate(itterator2);
        });
        
        it("Then the errors should be returned to both itterators", async () => {
            try {
                await promise1;
                fail("Promise should reject");
            } catch(e) {
                expect(e).toBe("b");
            }

            expect(itterator1.mock.calls).toEqual([
                ["a"],
            ])

            try {
                await promise2;
                fail("Promise should reject");
            } catch(e) {
                expect(e).toBe("b");
            }

            expect(itterator2.mock.calls).toEqual([
                ["a"],
            ])
        })
    })
})