import { TokenBase, TokenGenerator } from './token-generator';

describe('TokenGenerator', () => {

    it('should accept 0 parameters', () => {
        const tokgen = new TokenGenerator();
        expect(tokgen).toBeInstanceOf(TokenGenerator);
        expect(tokgen._bitSize).toStrictEqual(128);
        expect(tokgen._baseEncoding).toStrictEqual(TokenBase.BASE58);
    });

    it('should accept just a bitSize parameter', () => {
        const tokgen = new TokenGenerator({ bitSize: 256 });
        expect(tokgen._bitSize).toStrictEqual(256);
        expect(tokgen._baseEncoding).toStrictEqual(TokenBase.BASE58);
    });

    it('should accept just a baseEncoding parameter', () => {
        const tokgen = new TokenGenerator({ baseEncoding: TokenBase.BASE16 });
        expect(tokgen._bitSize).toStrictEqual(128);
        expect(tokgen._baseEncoding).toStrictEqual(TokenBase.BASE16);
    });

    it('should accept both parameters', () => {
        const tokgen = new TokenGenerator({ bitSize: 512, baseEncoding: TokenBase.BASE62 });
        expect(tokgen._bitSize).toStrictEqual(512);
        expect(tokgen._baseEncoding).toStrictEqual(TokenBase.BASE62);
    });

    it('should accept a custom baseEncoding', () => {
        expect(new TokenGenerator({ baseEncoding: '123abc' })._baseEncoding).toStrictEqual('123abc');
        expect(new TokenGenerator({ bitSize: 512, baseEncoding: '123abc' })._baseEncoding).toStrictEqual('123abc');
    });

    it('should throw if bitSize is not a positive integer that is a multiple of 128', () => {

        expect(() => {
            // tslint:disable-next-line:no-unused-expression
            new TokenGenerator({ bitSize: -128 });
        }).toThrow();

        expect(() => {
            // tslint:disable-next-line:no-unused-expression
            new TokenGenerator({ bitSize: -127 });
        }).toThrow();

        expect(() => {
            // tslint:disable-next-line:no-unused-expression
            new TokenGenerator({ bitSize: Infinity });
        }).toThrow();

    });

});

describe('#bitSize', () => {

    it('should be the same value as is passed to the constructor', () => {
        expect(new TokenGenerator()._bitSize).toStrictEqual(128);
        expect(new TokenGenerator({ bitSize: 256 })._bitSize).toStrictEqual(256);
    });

});

describe('#baseEncoding', () => {

    it('should be the same value as is passed to the constructor', () => {
        expect(new TokenGenerator()._baseEncoding).toStrictEqual(TokenBase.BASE58);
        expect(new TokenGenerator({ baseEncoding: TokenBase.BASE62 })._baseEncoding).toStrictEqual(TokenBase.BASE62);
    });

});

describe('#base', () => {

    it('should be the encoding base number (which is the length of the baseEncoding)', () => {
        expect(new TokenGenerator()._base).toStrictEqual(58);
        expect(new TokenGenerator({ baseEncoding: TokenBase.BASE62 })._base).toStrictEqual(62);
        expect(new TokenGenerator({ bitSize: 256, baseEncoding: '123abc' })._base).toStrictEqual(6);
    });

});

describe('#tokenLength', () => {

    it('should be the maximum possible token length', () => {
        expect(new TokenGenerator()._tokenLength).toStrictEqual(22);
        expect(new TokenGenerator({ bitSize: 256, baseEncoding: TokenBase.BASE62 })._tokenLength).toStrictEqual(43);
        expect(new TokenGenerator({ bitSize: 512, baseEncoding: '01' })._tokenLength).toStrictEqual(512);
    });

});

describe('#generate()', () => {

    it('should generate a token with the specified bitSize and baseEncoding', () => {
        let tokgen = new TokenGenerator();
        let token = tokgen.generate();
        const regExp: RegExp = new RegExp('^[' + tokgen._baseEncoding + ']{' + tokgen._tokenLength + '}$');
        expect(token).toMatch(regExp);

        tokgen = new TokenGenerator({ baseEncoding: TokenBase.BASE16 });
        token = tokgen.generate();
        const base16RegExp: RegExp = new RegExp('^[' + tokgen._baseEncoding + ']{' + tokgen._tokenLength + '}$');
        expect(token).toMatch(base16RegExp);

        tokgen = new TokenGenerator({ baseEncoding: '01' });
        token = tokgen.generate();
        const base2RegExp: RegExp = new RegExp('^[' + tokgen._baseEncoding + ']{' + tokgen._tokenLength + '}$');
        expect(token).toMatch(base2RegExp);

        tokgen = new TokenGenerator({ bitSize: 256 });
        token = tokgen.generate();
        const regExp256: RegExp = new RegExp('^[' + tokgen._baseEncoding + ']{' + tokgen._tokenLength + '}$');
        expect(token).toMatch(regExp256);

        tokgen = new TokenGenerator({ bitSize: 512, baseEncoding: TokenBase.BASE62 });
        token = tokgen.generate();
        const regExp512: RegExp = new RegExp('^[' + tokgen._baseEncoding + ']{' + tokgen._tokenLength + '}$');
        expect(token).toMatch(regExp512);
    });

    // it('should produce a token of the correct length even if the uuid function returns a small token value', () => {
    //     // Mock uuid.v4
    //     // jest.mock(UUID.v4)

    //     UUID.v4 = jest.fn()

    //     UUID.v4 = function (options, buffer, offset) {
    //         offset = offset || 0;
    //         for (var i = 0; i < 16; i++) {
    //             buffer[offset + i] = 1;
    //         }
    //     };
    //     const tokgen = new TokenGenerator({ bitSize: 256 });
    //     const token = tokgen.generate();
    //     const reqExp: RegExp = new RegExp('^[' + tokgen._baseEncoding + ']{' + tokgen._tokenLength + '}$')
    //     expect(token).toMatch(reqExp)
    // });

    // it('should work if the generated UUID has leading zeros', () => {
    //     // Mock uuid.v4
    //     let mockedV4 = function (options, buffer, offset) {
    //         offset = offset || 0;
    //         buffer[offset] = 0;
    //         buffer[offset + 1] = 0;
    //         for (var i = 2; i < 16; i++) {
    //             buffer[offset + i] = 256 * Math.random() | 0;
    //         }
    //     };
    //     const tokgen = new TokenGenerator();
    //     const token = tokgen.generate(mockedV4);
    //     token.should.match(new RegExp('^[' + tokgen.baseEncoding + ']{' + tokgen.tokenLength + '}$'));

    //     // Return all 0s
    //     uuid.v4 = (function (options, buffer, offset) {
    //         for (var i = 0; i < 16; i++) {
    //             buffer[offset + i] = 0;
    //         }
    //     });
    //     new TokenGenerator(128).generate().should.equal('1111111111111111111111');
    // });

});