import * as UUID from 'uuid';
import { v4, v4Buffer, V4Options, v4String } from 'uuid/interfaces';

export enum TokenBase {
    BASE16 = '0123456789abcdef',
    BASE36 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
    BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    BASE66 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~',
    BASE71 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!\'()*-._~',
}

export interface ITokenDto {
    readonly bitSize: number;
    readonly baseEncoding: TokenBase | string;
}

export type UUIDFunc = (options: V4Options, buffer: v4String & v4Buffer, offset: number) => any;

export class TokenGenerator {

    // tslint:disable-next-line:variable-name
    public readonly _bitSize: number;
    // tslint:disable-next-line:variable-name
    public readonly _baseEncoding: TokenBase | string;
    // tslint:disable-next-line:variable-name
    public readonly _base: number;
    // tslint:disable-next-line:variable-name
    public readonly _tokenLength: number;
    // tslint:disable-next-line:variable-name
    public readonly _bytes: number;

    constructor(dto: Partial<ITokenDto> = {}) {

        this._bitSize = dto.bitSize || 128;
        this._baseEncoding = dto.baseEncoding || TokenBase.BASE58;

        if (this._bitSize % 128 !== 0 || this._bitSize < 0) {
            throw new Error('bitSize must be a positive integer that is a multiple of 128');
        }
        if (typeof this._baseEncoding !== 'string') {
            throw new Error('baseEncoding must be a string');
        }

        this._base = this._baseEncoding.length;
        this._tokenLength = Math.ceil(this._bitSize / Math.log2(this._base));

        this._bytes = this._bitSize / 8;

    }

    public generate(v4Func: v4 = UUID.v4): string {
        const buffer = Buffer.allocUnsafe(this._bytes);
        let i;

        for (i = 0; i < this._bytes; i += 16) {
            v4Func(null, buffer, i);
        }

        if (this._baseEncoding === TokenBase.BASE16) {
            return buffer.toString('hex');
        }

        const digits = [0];

        for (i = 0; i < buffer.length; ++i) {
            let carry = buffer[i];

            for (let j = 0; j < digits.length; ++j) {
                // tslint:disable-next-line:no-bitwise
                carry += digits[j] << 8;
                digits[j] = carry % this._base;
                // tslint:disable-next-line:no-bitwise
                carry = (carry / this._base) | 0;
            }

            while (carry > 0) {
                digits.push(carry % this._base);
                // tslint:disable-next-line:no-bitwise
                carry = (carry / this._base) | 0;
            }
        }

        let token = digits.length < this._tokenLength
            ? this._baseEncoding[0].repeat(this._tokenLength - digits.length) // Leading zeros
            : '';

        i = digits.length;

        while (i--) {
            token += this._baseEncoding[digits[i]];
        }

        return token;
    }
}
