import json
import subprocess

class Test:
    def __init__(self, function, inputs, expected_result, name):
        self.function = function
        self.inputs = inputs
        self.expected_result = expected_result
        self.name = name
        
tests = []


def get_function(text, func_name):
    idx = text.index(func_name)
    start_delim, close_delim = ("{",  "}")
    body_start_idx = text[idx:].index(start_delim) + idx
    final_idx = body_start_idx # to update
    start_delim_count = 1
    for i, c in enumerate(text[body_start_idx + 1:]):
        if c == start_delim:
            start_delim_count += 1
        elif c == close_delim:
            start_delim_count -= 1
            if start_delim_count == 0:
                final_idx = i + body_start_idx
                break
    return text[idx: final_idx + 2]

def populate_js_functions(functions):
    func_bodies = []
    for func_details in functions:
        path = func_details["path"]
        function = func_details["name"]
        with open(path, 'r') as f:
            func_start = f'const {function}'
            text = f.read()
            function_body = get_function(text, func_start)
            func_bodies.append(function_body)
    return func_bodies

def write_js_tests():
    with open('testable_functions.js', 'w') as f:
        for test in tests:
            f.write(test.function)
        for test in tests:
            inputs = ",".join(test.inputs)
            function_call = "console.log(" + test.name + "(" + inputs + "))" 
            f.write("\n" + function_call)

def run_tests():
    output = subprocess.run(["node", "testable_functions.js"], capture_output=True).stdout
    output = output.decode('utf-8')
    output = sanitize_result(output)
    for i, test in enumerate(tests):
        expected = sanitize_result(str(test.expected_result))
        try: 
            assert(expected in output)
            print(f"Success {i+1}/{len(tests)}")
        except AssertionError:
            print(f"expected:\n {expected}\n got:\n {output}")

def sanitize_result(string):
    string = "".join(string.split("\n"))
    string = "".join(string.split(" "))
    string = "".join(string.split("'"))
    string = "".join(string.split('"'))
    return string
    
def main():
    data = json.load(open('testable_functions.json', 'r'))
    functions = data["functions"]
    js_functions = populate_js_functions(functions)
    for function, js_function in zip(functions, js_functions):
        inputs = []
        for i in range(1, 10):
            input = function["inputs"].get(str(i), None)
            if input == None:
                break
            inputs.append(str(input))
        expected_result = function["expected_result"]
        new_test = Test(js_function, inputs, expected_result, function["name"])
        tests.append(new_test)
    write_js_tests()
    run_tests()


if __name__ == "__main__":
    main()