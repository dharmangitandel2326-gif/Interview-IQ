export const questions = [
  // ==================== JAVASCRIPT ====================
  {
    id: 1,
    category: "JavaScript",
    question: "What is JavaScript?",
    description: "Explain its role in web development.",
    difficulty: "Beginner",
    answer: "JavaScript is a programming language used to make websites interactive and dynamic."
  },
  {
    id: 2,
    category: "JavaScript",
    question: "What is the difference between var, let, and const?",
    description: "Compare scope and reassignment.",
    difficulty: "Beginner",
    answer: "var is function-scoped, while let and const are block-scoped. let can be reassigned; const cannot be reassigned."
  },
  {
    id: 3,
    category: "JavaScript",
    question: "What are JavaScript data types?",
    description: "Name the primitive and reference types.",
    difficulty: "Beginner",
    answer: "Primitive types include string, number, bigint, boolean, undefined, symbol, and null. Objects, including arrays and functions, are reference types."
  },
  {
    id: 4,
    category: "JavaScript",
    question: "What is the difference between == and ===?",
    description: "Explain loose and strict equality.",
    difficulty: "Beginner",
    answer: "== may convert types before comparison. === compares values without type conversion."
  },
  {
    id: 5,
    category: "JavaScript",
    question: "What is a function?",
    description: "Explain reusable blocks of code.",
    difficulty: "Beginner",
    answer: "A function is a reusable block of code that can accept parameters and return a result."
  },
  {
    id: 6,
    category: "JavaScript",
    question: "What is an arrow function?",
    description: "Explain the arrow function syntax.",
    difficulty: "Beginner",
    answer: "An arrow function uses the => syntax. It provides concise function syntax and inherits this from its surrounding scope."
  },
  {
    id: 7,
    category: "JavaScript",
    question: "What is scope?",
    description: "Explain where variables can be accessed.",
    difficulty: "Beginner",
    answer: "Scope determines where variables and functions are accessible. Common types include global, function, and block scope."
  },
  {
    id: 8,
    category: "JavaScript",
    question: "What is hoisting?",
    description: "Explain how declarations are processed.",
    difficulty: "Intermediate",
    answer: "Hoisting describes how JavaScript processes declarations before executing code. var variables are initialized to undefined, while let and const cannot be accessed before initialization."
  },
  {
    id: 9,
    category: "JavaScript",
    question: "What is a closure?",
    description: "Explain how functions retain access to outer variables.",
    difficulty: "Intermediate",
    answer: "A closure is a function that retains access to variables from its surrounding lexical scope, even after the outer function has finished."
  },
  {
    id: 10,
    category: "JavaScript",
    question: "What is the DOM?",
    description: "Explain how JavaScript interacts with HTML.",
    difficulty: "Beginner",
    answer: "The Document Object Model represents a web page as a tree of objects that JavaScript can read and modify."
  },
  {
    id: 11,
    category: "JavaScript",
    question: "What is an event listener?",
    description: "Explain responding to user actions.",
    difficulty: "Beginner",
    answer: "An event listener executes a callback when an event occurs, such as a click or key press."
  },
  {
    id: 12,
    category: "JavaScript",
    question: "What is event bubbling?",
    description: "Explain how events propagate through elements.",
    difficulty: "Intermediate",
    answer: "Event bubbling means an event propagates from the target element upward through its ancestor elements."
  },
  {
    id: 13,
    category: "JavaScript",
    question: "What is event delegation?",
    description: "Explain handling child events through a parent.",
    difficulty: "Intermediate",
    answer: "Event delegation places a listener on a parent element to handle events from its descendants."
  },
  {
    id: 14,
    category: "JavaScript",
    question: "What is a callback function?",
    description: "Explain passing functions as arguments.",
    difficulty: "Beginner",
    answer: "A callback is a function passed to another function to be executed later or when a task completes."
  },
  {
    id: 15,
    category: "JavaScript",
    question: "What is a Promise?",
    description: "Explain asynchronous operations.",
    difficulty: "Intermediate",
    answer: "A Promise represents the eventual success or failure of an asynchronous operation."
  },
  {
    id: 16,
    category: "JavaScript",
    question: "What do async and await do?",
    description: "Explain asynchronous JavaScript syntax.",
    difficulty: "Intermediate",
    answer: "async makes a function return a Promise. await pauses that async function until the awaited Promise settles."
  },
  {
    id: 17,
    category: "JavaScript",
    question: "What is the event loop?",
    description: "Explain how asynchronous callbacks are scheduled.",
    difficulty: "Advanced",
    answer: "The event loop coordinates the call stack and task queues so callbacks can run when the execution stack is available."
  },
  {
    id: 18,
    category: "JavaScript",
    question: "What is the difference between null and undefined?",
    description: "Compare two absence-related values.",
    difficulty: "Beginner",
    answer: "undefined commonly means a value has not been assigned. null is usually used to represent an intentional absence of a value."
  },
  {
    id: 19,
    category: "JavaScript",
    question: "What do map(), filter(), and reduce() do?",
    description: "Explain common array methods.",
    difficulty: "Intermediate",
    answer: "map transforms each element, filter selects matching elements, and reduce combines elements into one accumulated result."
  },
  {
    id: 20,
    category: "JavaScript",
    question: "What is destructuring?",
    description: "Explain extracting values from arrays and objects.",
    difficulty: "Beginner",
    answer: "Destructuring lets you extract values from arrays or properties from objects into variables."
  },
  {
    id: 21,
    category: "JavaScript",
    question: "What is the spread operator?",
    description: "Explain expanding arrays and objects.",
    difficulty: "Intermediate",
    answer: "Spread syntax (...) expands iterable values or enumerable object properties into another array, object, or function call."
  },
  {
    id: 22,
    category: "JavaScript",
    question: "What is the rest parameter?",
    description: "Explain collecting remaining function arguments.",
    difficulty: "Intermediate",
    answer: "The rest parameter (...) collects remaining function arguments into an array."
  },
  {
    id: 23,
    category: "JavaScript",
    question: "What is a template literal?",
    description: "Explain string interpolation.",
    difficulty: "Beginner",
    answer: "Template literals use backticks and allow expressions to be embedded using ${expression}."
  },
  {
    id: 24,
    category: "JavaScript",
    question: "What are JavaScript modules?",
    description: "Explain import and export.",
    difficulty: "Intermediate",
    answer: "Modules organize code into separate files. They can export values and import values from other modules."
  },
  {
    id: 25,
    category: "JavaScript",
    question: "What is the difference between localStorage and sessionStorage?",
    description: "Compare browser storage.",
    difficulty: "Beginner",
    answer: "localStorage persists until cleared. sessionStorage generally lasts for the lifetime of the browser tab session."
  },

  // ==================== REACT ====================
  {
    id: 26,
    category: "React",
    question: "What is React?",
    description: "Explain React's purpose.",
    difficulty: "Beginner",
    answer: "React is a JavaScript library for building user interfaces using reusable components."
  },
  {
    id: 27,
    category: "React",
    question: "What is a React component?",
    description: "Explain reusable UI elements.",
    difficulty: "Beginner",
    answer: "A React component is a reusable part of a user interface, commonly written as a JavaScript function that returns JSX."
  },
  {
    id: 28,
    category: "React",
    question: "What is JSX?",
    description: "Explain HTML-like syntax in React.",
    difficulty: "Beginner",
    answer: "JSX is a syntax extension that lets developers describe user interfaces with markup-like syntax inside JavaScript."
  },
  {
    id: 29,
    category: "React",
    question: "What are props in React?",
    description: "Explain passing data between components.",
    difficulty: "Beginner",
    answer: "Props are read-only values passed from a parent component to a child component."
  },
  {
    id: 30,
    category: "React",
    question: "What is state in React?",
    description: "Explain data that changes over time.",
    difficulty: "Beginner",
    answer: "State is component data that can change and cause React to render an updated user interface."
  },
  {
    id: 31,
    category: "React",
    question: "What does useState do?",
    description: "Explain the useState Hook.",
    difficulty: "Beginner",
    answer: "useState adds a state variable and a setter function to a function component."
  },
  {
    id: 32,
    category: "React",
    question: "What does useEffect do?",
    description: "Explain effects and dependencies.",
    difficulty: "Intermediate",
    answer: "useEffect synchronizes a component with external systems. Its dependency array controls when the effect runs again."
  },
  {
    id: 33,
    category: "React",
    question: "Why do React lists need keys?",
    description: "Explain identifying list items.",
    difficulty: "Beginner",
    answer: "Keys help React identify items between renders and update lists correctly. Stable unique IDs are usually preferred."
  },
  {
    id: 34,
    category: "React",
    question: "What is conditional rendering?",
    description: "Explain showing UI based on conditions.",
    difficulty: "Beginner",
    answer: "Conditional rendering uses JavaScript conditions to decide which components or elements should appear."
  },
  {
    id: 35,
    category: "React",
    question: "What is lifting state up?",
    description: "Explain sharing state between components.",
    difficulty: "Intermediate",
    answer: "Lifting state up moves shared state into the closest common parent component so multiple children can use it."
  },
  {
    id: 36,
    category: "React",
    question: "What is a controlled component?",
    description: "Explain controlled form inputs.",
    difficulty: "Intermediate",
    answer: "A controlled input receives its value from React state and updates that state through an event handler."
  },
  {
    id: 37,
    category: "React",
    question: "What is an uncontrolled component?",
    description: "Explain DOM-managed form inputs.",
    difficulty: "Intermediate",
    answer: "An uncontrolled input manages its current value in the DOM. A ref can be used to read its value."
  },
  {
    id: 38,
    category: "React",
    question: "What is the virtual DOM?",
    description: "Explain React's representation of UI.",
    difficulty: "Intermediate",
    answer: "The virtual DOM is a representation of the UI that React uses to determine what needs updating."
  },
  {
    id: 39,
    category: "React",
    question: "What is reconciliation?",
    description: "Explain how React updates the UI.",
    difficulty: "Advanced",
    answer: "Reconciliation is the process React uses to compare previous and next element trees and determine necessary updates."
  },
  {
    id: 40,
    category: "React",
    question: "What is useRef?",
    description: "Explain persistent references.",
    difficulty: "Intermediate",
    answer: "useRef stores a mutable value or DOM reference between renders. Changing its current value does not itself trigger a rerender."
  },
  {
    id: 41,
    category: "React",
    question: "What is useMemo?",
    description: "Explain memoizing calculations.",
    difficulty: "Advanced",
    answer: "useMemo caches a calculation result between renders until its dependencies change."
  },
  {
    id: 42,
    category: "React",
    question: "What is useCallback?",
    description: "Explain memoizing function references.",
    difficulty: "Advanced",
    answer: "useCallback caches a function definition between renders until its dependencies change."
  },
  {
    id: 43,
    category: "React",
    question: "What is prop drilling?",
    description: "Explain passing props through multiple levels.",
    difficulty: "Intermediate",
    answer: "Prop drilling occurs when data is passed through intermediate components that do not directly need it."
  },
  {
    id: 44,
    category: "React",
    question: "What is the Context API?",
    description: "Explain sharing values across a component tree.",
    difficulty: "Intermediate",
    answer: "Context allows components to access shared values without passing props through every intermediate component."
  },
  {
    id: 45,
    category: "React",
    question: "What are React Fragments?",
    description: "Explain grouping elements without wrappers.",
    difficulty: "Beginner",
    answer: "Fragments group multiple elements without adding an extra DOM element."
  },
  {
    id: 46,
    category: "React",
    question: "Why should React state not be mutated directly?",
    description: "Explain immutable updates.",
    difficulty: "Intermediate",
    answer: "Direct mutation can make changes difficult to detect and reason about. Create new arrays or objects when updating state."
  },
  {
    id: 47,
    category: "React",
    question: "What is a custom Hook?",
    description: "Explain reusable React logic.",
    difficulty: "Intermediate",
    answer: "A custom Hook is a JavaScript function whose name starts with use and that reuses logic involving React Hooks."
  },
  {
    id: 48,
    category: "React",
    question: "What is React Router?",
    description: "Explain routing in React applications.",
    difficulty: "Beginner",
    answer: "React Router is a library that helps implement navigation and route-based UI in React applications."
  },
  {
    id: 49,
    category: "React",
    question: "What is lazy loading in React?",
    description: "Explain loading components when needed.",
    difficulty: "Intermediate",
    answer: "React.lazy lets an application defer loading a component until it is needed. It is commonly used with Suspense."
  },
  {
    id: 50,
    category: "React",
    question: "What is Suspense?",
    description: "Explain fallback UI during loading.",
    difficulty: "Intermediate",
    answer: "Suspense displays fallback content while supported child content is waiting to load."
  },

  // ==================== PYTHON ====================
  {
    id: 51,
    category: "Python",
    question: "What is Python?",
    description: "Explain Python and its uses.",
    difficulty: "Beginner",
    answer: "Python is a high-level, general-purpose programming language used in web development, automation, data science, and many other areas."
  },
  {
    id: 52,
    category: "Python",
    question: "What are Python's basic data types?",
    description: "Name common built-in types.",
    difficulty: "Beginner",
    answer: "Common types include int, float, str, bool, list, tuple, dict, set, and NoneType."
  },
  {
    id: 53,
    category: "Python",
    question: "What is the difference between a list and a tuple?",
    description: "Compare mutability.",
    difficulty: "Beginner",
    answer: "Lists are mutable, meaning their contents can change. Tuples are immutable sequences."
  },
  {
    id: 54,
    category: "Python",
    question: "What is a dictionary?",
    description: "Explain key-value storage.",
    difficulty: "Beginner",
    answer: "A dictionary stores key-value pairs and lets you look up values using keys."
  },
  {
    id: 55,
    category: "Python",
    question: "What is a set?",
    description: "Explain unique elements.",
    difficulty: "Beginner",
    answer: "A set is an unordered collection of distinct hashable elements."
  },
  {
    id: 56,
    category: "Python",
    question: "Why is indentation important in Python?",
    description: "Explain Python code blocks.",
    difficulty: "Beginner",
    answer: "Indentation defines code blocks in Python, such as the bodies of functions, loops, and conditional statements."
  },
  {
    id: 57,
    category: "Python",
    question: "How do you define a function in Python?",
    description: "Explain def and return.",
    difficulty: "Beginner",
    answer: "Use def followed by the function name and parameters. Use return to send a result back to the caller."
  },
  {
    id: 58,
    category: "Python",
    question: "What are *args and **kwargs?",
    description: "Explain flexible function arguments.",
    difficulty: "Intermediate",
    answer: "*args collects extra positional arguments into a tuple. **kwargs collects extra keyword arguments into a dictionary."
  },
  {
    id: 59,
    category: "Python",
    question: "What is a list comprehension?",
    description: "Explain concise list creation.",
    difficulty: "Beginner",
    answer: "A list comprehension creates a list from an iterable using an expression and optional condition."
  },
  {
    id: 60,
    category: "Python",
    question: "What is a lambda function?",
    description: "Explain anonymous functions.",
    difficulty: "Beginner",
    answer: "A lambda is a small anonymous function containing a single expression."
  },
  {
    id: 61,
    category: "Python",
    question: "What is a decorator?",
    description: "Explain wrapping function behavior.",
    difficulty: "Advanced",
    answer: "A decorator takes a function or class and returns a modified or wrapped version."
  },
  {
    id: 62,
    category: "Python",
    question: "What is a generator?",
    description: "Explain lazy iteration.",
    difficulty: "Intermediate",
    answer: "A generator produces values on demand, often using yield, instead of building the entire sequence at once."
  },
  {
    id: 63,
    category: "Python",
    question: "What is an iterator?",
    description: "Explain retrieving values one at a time.",
    difficulty: "Intermediate",
    answer: "An iterator provides values one at a time using the iterator protocol, including __iter__ and __next__."
  },
  {
    id: 64,
    category: "Python",
    question: "What is the difference between is and ==?",
    description: "Compare identity and equality.",
    difficulty: "Beginner",
    answer: "== compares values for equality. is checks whether two references point to the same object."
  },
  {
    id: 65,
    category: "Python",
    question: "How does exception handling work in Python?",
    description: "Explain try, except, and finally.",
    difficulty: "Beginner",
    answer: "try contains code that may raise an exception, except handles selected errors, and finally is used for cleanup."
  },
  {
    id: 66,
    category: "Python",
    question: "What is a Python module?",
    description: "Explain reusable Python files.",
    difficulty: "Beginner",
    answer: "A module is a Python file containing code such as functions, classes, and variables that can be imported."
  },
  {
    id: 67,
    category: "Python",
    question: "What is a virtual environment?",
    description: "Explain isolated project dependencies.",
    difficulty: "Beginner",
    answer: "A virtual environment creates an isolated Python environment for a project's installed packages."
  },
  {
    id: 68,
    category: "Python",
    question: "What is pip?",
    description: "Explain Python package installation.",
    difficulty: "Beginner",
    answer: "pip is a package installer commonly used to install Python libraries."
  },
  {
    id: 69,
    category: "Python",
    question: "What is a class in Python?",
    description: "Explain object-oriented programming.",
    difficulty: "Beginner",
    answer: "A class defines the attributes and methods used to create objects."
  },
  {
    id: 70,
    category: "Python",
    question: "What is inheritance?",
    description: "Explain reusing class behavior.",
    difficulty: "Intermediate",
    answer: "Inheritance allows a class to derive attributes and methods from another class."
  },
  {
    id: 71,
    category: "Python",
    question: "What is polymorphism?",
    description: "Explain common interfaces with different behavior.",
    difficulty: "Intermediate",
    answer: "Polymorphism allows different object types to be used through a common interface while providing their own behavior."
  },
  {
    id: 72,
    category: "Python",
    question: "What is encapsulation?",
    description: "Explain grouping data and methods.",
    difficulty: "Intermediate",
    answer: "Encapsulation groups data and related methods together and uses conventions or interfaces to manage access."
  },
  {
    id: 73,
    category: "Python",
    question: "What is __init__?",
    description: "Explain initializing a new object.",
    difficulty: "Beginner",
    answer: "__init__ is an initializer method called after a new instance has been created."
  },
  {
    id: 74,
    category: "Python",
    question: "What does self mean in Python?",
    description: "Explain instance methods.",
    difficulty: "Beginner",
    answer: "self conventionally refers to the current instance inside an instance method."
  },
  {
    id: 75,
    category: "Python",
    question: "How do you read a file safely?",
    description: "Explain automatic resource cleanup.",
    difficulty: "Beginner",
    answer: "Use a with statement, such as with open('file.txt', encoding='utf-8') as file, so the file is closed automatically."
  },

  // ==================== JAVA ====================
  {
    id: 76,
    category: "Java",
    question: "What is Java?",
    description: "Explain Java's common characteristics.",
    difficulty: "Beginner",
    answer: "Java is a class-based, object-oriented programming language commonly compiled to bytecode that runs on a Java Virtual Machine."
  },
  {
    id: 77,
    category: "Java",
    question: "What is the JVM?",
    description: "Explain Java bytecode execution.",
    difficulty: "Beginner",
    answer: "The Java Virtual Machine executes Java bytecode and provides runtime services."
  },
  {
    id: 78,
    category: "Java",
    question: "What is the JDK?",
    description: "Explain the Java development toolkit.",
    difficulty: "Beginner",
    answer: "The Java Development Kit provides tools for developing Java applications, including a compiler and runtime components."
  },
  {
    id: 79,
    category: "Java",
    question: "What is the difference between JDK, JRE, and JVM?",
    description: "Compare development tools and runtime components.",
    difficulty: "Beginner",
    answer: "The JVM executes bytecode. The JRE conceptually provides the JVM and runtime libraries. The JDK adds development tools. Packaging varies by Java release."
  },
  {
    id: 80,
    category: "Java",
    question: "What are the four pillars of OOP?",
    description: "Name the main object-oriented concepts.",
    difficulty: "Beginner",
    answer: "The four commonly taught pillars are encapsulation, abstraction, inheritance, and polymorphism."
  },
  {
    id: 81,
    category: "Java",
    question: "What is method overloading?",
    description: "Explain methods with the same name.",
    difficulty: "Beginner",
    answer: "Overloading defines multiple methods with the same name but different parameter lists."
  },
  {
    id: 82,
    category: "Java",
    question: "What is method overriding?",
    description: "Explain redefining inherited behavior.",
    difficulty: "Intermediate",
    answer: "Overriding provides a subclass implementation of an inherited instance method with a compatible signature."
  },
  {
    id: 83,
    category: "Java",
    question: "What is an interface in Java?",
    description: "Explain a contract for implementing classes.",
    difficulty: "Beginner",
    answer: "An interface defines a contract that implementing classes agree to fulfill."
  },
  {
    id: 84,
    category: "Java",
    question: "What is an abstract class?",
    description: "Explain shared base behavior.",
    difficulty: "Beginner",
    answer: "An abstract class cannot be instantiated directly and can contain both abstract and implemented methods."
  },
  {
    id: 85,
    category: "Java",
    question: "What is the difference between an interface and an abstract class?",
    description: "Compare contracts and shared state.",
    difficulty: "Intermediate",
    answer: "An abstract class can hold instance state and constructors. An interface defines a contract and can include default, static, and private methods."
  },
  {
    id: 86,
    category: "Java",
    question: "What is a constructor?",
    description: "Explain object initialization.",
    difficulty: "Beginner",
    answer: "A constructor initializes a new object and has the same name as its class."
  },
  {
    id: 87,
    category: "Java",
    question: "What is the difference between == and equals()?",
    description: "Compare reference equality and logical equality.",
    difficulty: "Beginner",
    answer: "For objects, == compares references. equals() can compare logical content if the class implements it appropriately."
  },
  {
    id: 88,
    category: "Java",
    question: "Why is String immutable in Java?",
    description: "Explain string immutability.",
    difficulty: "Intermediate",
    answer: "String objects cannot be changed after creation. Operations that appear to modify a string produce another string."
  },
  {
    id: 89,
    category: "Java",
    question: "What is the difference between StringBuilder and StringBuffer?",
    description: "Compare mutable string classes.",
    difficulty: "Intermediate",
    answer: "Both are mutable string classes. StringBuffer synchronizes its methods, while StringBuilder is generally preferable when synchronization is unnecessary."
  },
  {
    id: 90,
    category: "Java",
    question: "What is an exception?",
    description: "Explain handling abnormal program conditions.",
    difficulty: "Beginner",
    answer: "An exception is an object representing an event that interrupts normal program execution and can be handled."
  },
  {
    id: 91,
    category: "Java",
    question: "What is the difference between checked and unchecked exceptions?",
    description: "Compare compiler-enforced handling.",
    difficulty: "Intermediate",
    answer: "Checked exceptions must be caught or declared. Runtime exceptions and their subclasses are unchecked and do not have that requirement."
  },
  {
    id: 92,
    category: "Java",
    question: "What is the finally block?",
    description: "Explain cleanup behavior.",
    difficulty: "Beginner",
    answer: "A finally block usually runs after try/catch processing and is commonly used for cleanup."
  },
  {
    id: 93,
    category: "Java",
    question: "What is the Java Collections Framework?",
    description: "Explain storing and processing groups of objects.",
    difficulty: "Beginner",
    answer: "The Collections Framework provides interfaces and implementations for data structures such as lists, sets, queues, and maps."
  },
  {
    id: 94,
    category: "Java",
    question: "What is the difference between ArrayList and LinkedList?",
    description: "Compare list implementations.",
    difficulty: "Intermediate",
    answer: "ArrayList supports fast indexed access. LinkedList supports efficient operations at known ends or positions, but indexed access requires traversal."
  },
  {
    id: 95,
    category: "Java",
    question: "What is a HashMap?",
    description: "Explain key-value storage.",
    difficulty: "Beginner",
    answer: "HashMap stores key-value pairs and provides efficient average-case lookup using hashing."
  },
  {
    id: 96,
    category: "Java",
    question: "What are generics?",
    description: "Explain type parameters.",
    difficulty: "Intermediate",
    answer: "Generics let classes, interfaces, and methods work with specified types while improving compile-time type safety."
  },
  {
    id: 97,
    category: "Java",
    question: "What is a thread?",
    description: "Explain concurrent execution.",
    difficulty: "Beginner",
    answer: "A thread is an individual path of execution within a process."
  },
  {
    id: 98,
    category: "Java",
    question: "What is synchronization?",
    description: "Explain coordinating access to shared resources.",
    difficulty: "Intermediate",
    answer: "Synchronization coordinates access to shared resources to help prevent race conditions."
  },
  {
    id: 99,
    category: "Java",
    question: "What is a lambda expression?",
    description: "Explain concise functional behavior.",
    difficulty: "Intermediate",
    answer: "A lambda expression provides a concise implementation of a functional interface's single abstract method."
  },
  {
    id: 100,
    category: "Java",
    question: "What is garbage collection?",
    description: "Explain automatic memory management.",
    difficulty: "Beginner",
    answer: "Java garbage collection reclaims memory occupied by objects that are no longer reachable."
  },

  // ==================== SQL ====================
  {
    id: 101,
    category: "SQL",
    question: "What is SQL?",
    description: "Explain querying relational databases.",
    difficulty: "Beginner",
    answer: "SQL is a language used to define, query, and manipulate data in relational databases."
  },
  {
    id: 102,
    category: "SQL",
    question: "What is a primary key?",
    description: "Explain unique row identification.",
    difficulty: "Beginner",
    answer: "A primary key uniquely identifies each row in a table and cannot contain NULL values."
  },
  {
    id: 103,
    category: "SQL",
    question: "What is a foreign key?",
    description: "Explain relationships between tables.",
    difficulty: "Beginner",
    answer: "A foreign key references a key in another table or the same table and helps enforce referential integrity."
  },
  {
    id: 104,
    category: "SQL",
    question: "What is the difference between WHERE and HAVING?",
    description: "Compare row filtering and group filtering.",
    difficulty: "Beginner",
    answer: "WHERE filters rows before grouping. HAVING filters groups after aggregation."
  },
  {
    id: 105,
    category: "SQL",
    question: "What is a JOIN?",
    description: "Explain combining rows from tables.",
    difficulty: "Beginner",
    answer: "A JOIN combines rows from two or more tables using a related column or join condition."
  },
  {
    id: 106,
    category: "SQL",
    question: "What is the difference between INNER JOIN and LEFT JOIN?",
    description: "Compare matching rows and all left-side rows.",
    difficulty: "Beginner",
    answer: "INNER JOIN returns matching rows from both sides. LEFT JOIN returns all left-side rows and matching right-side rows, using NULL when no match exists."
  },
  {
    id: 107,
    category: "SQL",
    question: "What is GROUP BY?",
    description: "Explain grouping rows for aggregation.",
    difficulty: "Beginner",
    answer: "GROUP BY groups rows with matching values so aggregate functions can calculate results for each group."
  },
  {
    id: 108,
    category: "SQL",
    question: "What is ORDER BY?",
    description: "Explain sorting query results.",
    difficulty: "Beginner",
    answer: "ORDER BY sorts query results by one or more columns or expressions in ascending or descending order."
  },
  {
    id: 109,
    category: "SQL",
    question: "What does DISTINCT do?",
    description: "Explain removing duplicate result rows.",
    difficulty: "Beginner",
    answer: "DISTINCT removes duplicate rows from the selected result columns."
  },
  {
    id: 110,
    category: "SQL",
    question: "What are aggregate functions?",
    description: "Name common aggregate operations.",
    difficulty: "Beginner",
    answer: "Aggregate functions summarize multiple rows. Examples include COUNT(), SUM(), AVG(), MIN(), and MAX()."
  },
  {
    id: 111,
    category: "SQL",
    question: "What is the difference between DELETE, TRUNCATE, and DROP?",
    description: "Compare deleting rows and database objects.",
    difficulty: "Intermediate",
    answer: "DELETE removes selected rows, TRUNCATE removes all rows from a table in supported databases, and DROP removes the database object. Transaction behavior varies by database."
  },
  {
    id: 112,
    category: "SQL",
    question: "What is a database index?",
    description: "Explain query performance and trade-offs.",
    difficulty: "Intermediate",
    answer: "An index can speed up data retrieval, but it consumes storage and adds overhead to inserts, updates, and deletes."
  },
  {
    id: 113,
    category: "SQL",
    question: "What is normalization?",
    description: "Explain reducing redundancy.",
    difficulty: "Intermediate",
    answer: "Normalization organizes relational data to reduce unnecessary duplication and prevent update anomalies."
  },
  {
    id: 114,
    category: "SQL",
    question: "What is denormalization?",
    description: "Explain intentional redundancy.",
    difficulty: "Intermediate",
    answer: "Denormalization introduces some redundancy to improve selected read workloads, with trade-offs for storage and data consistency."
  },
  {
    id: 115,
    category: "SQL",
    question: "What is a transaction?",
    description: "Explain a group of database operations.",
    difficulty: "Beginner",
    answer: "A transaction groups database operations into a logical unit that can be committed or rolled back."
  },
  {
    id: 116,
    category: "SQL",
    question: "What are ACID properties?",
    description: "Name the main transaction guarantees.",
    difficulty: "Intermediate",
    answer: "ACID stands for atomicity, consistency, isolation, and durability."
  },
  {
    id: 117,
    category: "SQL",
    question: "What is a subquery?",
    description: "Explain a query inside another query.",
    difficulty: "Beginner",
    answer: "A subquery is a query embedded inside another SQL statement."
  },
  {
    id: 118,
    category: "SQL",
    question: "What is a view?",
    description: "Explain a named query that behaves like a table.",
    difficulty: "Beginner",
    answer: "A view is a named query presented as a virtual table. Whether it can be updated depends on the database and view definition."
  },
  {
    id: 119,
    category: "SQL",
    question: "What is a stored procedure?",
    description: "Explain reusable database-side routines.",
    difficulty: "Intermediate",
    answer: "A stored procedure is a named routine stored in the database that can execute operations and accept parameters."
  },
  {
    id: 120,
    category: "SQL",
    question: "What is a trigger?",
    description: "Explain automatic database actions.",
    difficulty: "Intermediate",
    answer: "A trigger runs automatically in response to specified database events, such as inserts, updates, or deletes."
  },
  {
    id: 121,
    category: "SQL",
    question: "What is the difference between UNION and UNION ALL?",
    description: "Compare combining query results.",
    difficulty: "Beginner",
    answer: "UNION removes duplicate rows from combined results. UNION ALL keeps duplicates and is often faster."
  },
  {
    id: 122,
    category: "SQL",
    question: "How do you check for NULL values?",
    description: "Explain SQL NULL comparisons.",
    difficulty: "Beginner",
    answer: "Use IS NULL or IS NOT NULL. Comparisons such as column = NULL do not correctly test for NULL."
  },
  {
    id: 123,
    category: "SQL",
    question: "What is a window function?",
    description: "Explain calculations across related rows.",
    difficulty: "Advanced",
    answer: "A window function calculates a value across a related set of rows while keeping individual rows in the result."
  },
  {
    id: 124,
    category: "SQL",
    question: "What does ROW_NUMBER() do?",
    description: "Explain numbering rows within a window.",
    difficulty: "Intermediate",
    answer: "ROW_NUMBER() assigns a sequential number to each row within a window partition based on the specified ordering."
  },
  {
    id: 125,
    category: "SQL",
    question: "What is a Common Table Expression (CTE)?",
    description: "Explain named query results.",
    difficulty: "Intermediate",
    answer: "A CTE, introduced with WITH, names a query result that can be referenced within a single SQL statement."
  }
];