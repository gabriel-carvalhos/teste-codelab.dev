var VerifyString = /** @class */ (function () {
    function VerifyString(s) {
        this._string = s;
    }
    Object.defineProperty(VerifyString.prototype, "string", {
        get: function () {
            return this._string;
        },
        set: function (str) {
            this._string = str;
        },
        enumerable: false,
        configurable: true
    });
    VerifyString.prototype.validate = function () {
        var stack = [];
        var pairs = new Map([
            [")", "("],
            ["]", "["],
            ["}", "{"]
        ]);
        for (var i = 0; i < this._string.length; i++) {
            if (this._string[i] == "(" || this._string[i] == "{" || this._string[i] == "[") {
                stack.push(this._string[i]);
            }
            else if (this._string[i] == ")" || this._string[i] == "}" || this._string[i] == "]") {
                if (stack.length == 0) {
                    return -1;
                }
                var lastOpen = stack.pop();
                var expected = pairs.get(this._string[i]);
                if (lastOpen != expected) {
                    return -1;
                }
            }
            else {
                return -1;
            }
        }
        return stack.length == 0 ? 0 : -1;
    };
    return VerifyString;
}());
var input = require('prompt-sync')({ sigint: true });
var str = input("Digite sua string: ");
var validator = new VerifyString(str);
console.log(validator.string, validator.validate());
// TESTES
validator.string = "()";
console.log(validator.string, validator.validate());
validator.string = "()[]{}";
console.log(validator.string, validator.validate());
validator.string = "(]";
console.log(validator.string, validator.validate());
validator.string = "([])";
console.log(validator.string, validator.validate());
validator.string = "([)]";
console.log(validator.string, validator.validate());
validator.string = "a(";
console.log(validator.string, validator.validate());
