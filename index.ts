class VerifyString {
    private _string: string;

    constructor(s: string) {
        this._string = s;
    }

    get string() {
        return this._string;
    }

    set string(str: string) {
        this._string = str;
    }
    
    public validate() {
        const stack: string[] = [];
        const pairs: Map<string, string> = new Map([
            [")", "("],
            ["]", "["],
            ["}", "{"]
        ]);
        
        for (let i = 0; i < this._string.length; i++) {
            if (this._string[i] == "(" || this._string[i] == "{" || this._string[i] == "[") {
                stack.push(this._string[i]);
            } else if (this._string[i] == ")" || this._string[i] == "}" || this._string[i] == "]") {
                if (stack.length == 0) {
                    return -1;
                }
                
                const lastOpen = stack.pop();
                const expected = pairs.get(this._string[i]);

                if (lastOpen != expected) {
                    return -1;
                }
            } else {
                return -1;
            }
        }

        return stack.length == 0 ? 0 : -1;
    }
}

const input = require('prompt-sync')({ sigint: true });

const str = input("Digite sua string: ");
const validator = new VerifyString(str);

console.log(validator.string, validator.validate());

// TESTES
console.log("--- TESTES ---")
validator.string = "()"
console.log(validator.string, validator.validate());

validator.string = "()[]{}"
console.log(validator.string, validator.validate());

validator.string = "(]"
console.log(validator.string, validator.validate());

validator.string = "([])"
console.log(validator.string, validator.validate());

validator.string = "([)]"
console.log(validator.string, validator.validate());

validator.string = "a("
console.log(validator.string, validator.validate());