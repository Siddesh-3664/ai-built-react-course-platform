// Complete React Course - Zero to Hero
// All lesson data organized by modules

const courseLessons = [
    // MODULE 1: FUNDAMENTALS (Beginner)
    {
        id: 1,
        title: "What is React?",
        category: "Fundamentals",
        level: "Beginner",
        duration: "10 min",
        description: "React is a powerful JavaScript library for building user interfaces. Learn the core philosophy and why React is the #1 choice for modern web development.",
        keyPoints: [
            "<strong>Component-Based:</strong> Build encapsulated components that manage their own state",
            "<strong>Declarative:</strong> Design simple views for each state",
            "<strong>Virtual DOM:</strong> Efficient updates and rendering",
            "<strong>One-Way Data Flow:</strong> Predictable data management"
        ],
        code: `// A simple React component
function Welcome() {
    return <h1>Hello, React!</h1>;
}

// Render the component
ReactDOM.render(<Welcome />, document.getElementById('root'));`,
        quiz: {
            question: "What is the Virtual DOM?",
            options: [
                "A copy of the real DOM in memory",
                "A database for storing data",
                "A CSS framework",
                "A testing library"
            ],
            correct: 0
        },
        exercise: {
            title: "Create Your First Component",
            description: "Create a component called Greeting that displays 'Welcome to React!'",
            starterCode: `function Greeting() {
    // Your code here
    
}`,
            solution: `function Greeting() {
    return <h1>Welcome to React!</h1>;
}`,
            hints: [
                "Components must return JSX",
                "Use the return statement",
                "JSX looks like HTML but it's JavaScript"
            ],
            validate: (code) => {
                return code.includes('return') && code.includes('Welcome to React');
            }
        }
    },
    {
        id: 2,
        title: "JSX & Components",
        category: "Fundamentals",
        level: "Beginner",
        duration: "15 min",
        description: "JSX is JavaScript XML - a syntax extension that lets you write HTML-like code in JavaScript. Master components and props.",
        keyPoints: [
            "<strong>JSX Syntax:</strong> Write HTML-like code in JavaScript",
            "<strong>Props:</strong> Pass data to components",
            "<strong>Composition:</strong> Build complex UIs from simple parts",
            "<strong>Reusability:</strong> Write once, use everywhere"
        ],
        code: `function UserCard({ name, role, avatar }) {
    return (
        <div className="card">
            <img src={avatar} alt={name} />
            <h3>{name}</h3>
            <p>{role}</p>
        </div>
    );
}

// Usage
<UserCard name="Sarah" role="Developer" avatar="avatar.jpg" />`,
        quiz: {
            question: "What is the correct way to pass props?",
            options: [
                "<Component prop={value} />",
                "<Component prop=value />",
                "<Component {prop: value} />",
                "Component(prop: value)"
            ],
            correct: 0
        }
    },
    {
        id: 3,
        title: "State & useState",
        category: "Fundamentals",
        level: "Beginner",
        duration: "20 min",
        description: "State is data that changes over time. Learn useState hook to make your components interactive and dynamic.",
        keyPoints: [
            "<strong>useState Hook:</strong> Returns [state, setState]",
            "<strong>State Updates:</strong> Trigger re-renders automatically",
            "<strong>Multiple States:</strong> Use useState multiple times",
            "<strong>Functional Updates:</strong> Use callback for dependent updates"
        ],
        code: `function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <button onClick={() => setCount(c => c - 1)}>
                Decrement
            </button>
        </div>
    );
}`,
        quiz: {
            question: "How do you update state based on previous state?",
            options: [
                "setState(prevState => prevState + 1)",
                "setState(state + 1)",
                "state = state + 1",
                "updateState(state + 1)"
            ],
            correct: 0
        }
    },
    {
        id: 4,
        title: "Event Handling",
        category: "Fundamentals",
        level: "Beginner",
        duration: "15 min",
        description: "Handle user interactions with React's synthetic event system. Learn onClick, onChange, onSubmit and more.",
        keyPoints: [
            "<strong>camelCase:</strong> onClick, onChange, onSubmit",
            "<strong>Function References:</strong> Pass functions, not calls",
            "<strong>Event Object:</strong> Access event.target, preventDefault()",
            "<strong>Synthetic Events:</strong> Cross-browser compatibility"
        ],
        code: `function Form() {
    const [text, setText] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', text);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
            />
            <button type="submit">Submit</button>
        </form>
    );
}`
    },
    {
        id: 5,
        title: "Lists & Keys",
        category: "Fundamentals",
        level: "Beginner",
        duration: "15 min",
        description: "Render dynamic lists using map() and provide unique keys for optimal performance.",
        keyPoints: [
            "<strong>map() Function:</strong> Transform arrays to JSX",
            "<strong>Unique Keys:</strong> Use IDs, not indexes",
            "<strong>Performance:</strong> Keys help React optimize renders",
            "<strong>Stability:</strong> Keys should be stable and predictable"
        ],
        code: `function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    <input type="checkbox" checked={todo.done} />
                    {todo.text}
                </li>
            ))}
        </ul>
    );
}`
    },

    // MODULE 2: INTERMEDIATE
    {
        id: 6,
        title: "useEffect Hook",
        category: "Hooks",
        level: "Intermediate",
        duration: "25 min",
        description: "Master side effects: data fetching, subscriptions, timers, and DOM manipulation.",
        keyPoints: [
            "<strong>Side Effects:</strong> Operations outside component scope",
            "<strong>Dependency Array:</strong> [] = once, [dep] = when dep changes",
            "<strong>Cleanup:</strong> Return function to clean up resources",
            "<strong>Multiple Effects:</strong> Separate concerns"
        ],
        code: `function Timer() {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        
        // Cleanup function
        return () => clearInterval(interval);
    }, []); // Run once on mount
    
    return <p>Timer: {seconds}s</p>;
}`
    },
    {
        id: 7,
        title: "Conditional Rendering",
        category: "Patterns",
        level: "Intermediate",
        duration: "15 min",
        description: "Render different UI based on conditions using if/else, ternary, and logical operators.",
        keyPoints: [
            "<strong>Early Return:</strong> Return early based on conditions",
            "<strong>Ternary Operator:</strong> condition ? true : false",
            "<strong>Logical &&:</strong> Render only if true",
            "<strong>Switch Statements:</strong> Multiple conditions"
        ],
        code: `function UserGreeting({ isLoggedIn, user }) {
    if (!isLoggedIn) {
        return <button>Log In</button>;
    }
    
    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            {user.isAdmin && <p>Admin Panel</p>}
            <p>Status: {user.online ? '🟢 Online' : '🔴 Offline'}</p>
        </div>
    );
}`
    },
    {
        id: 8,
        title: "Forms & Validation",
        category: "Patterns",
        level: "Intermediate",
        duration: "30 min",
        description: "Build controlled forms with validation, error handling, and submission logic.",
        keyPoints: [
            "<strong>Controlled Components:</strong> React controls form state",
            "<strong>Validation:</strong> Real-time input validation",
            "<strong>Error Messages:</strong> User-friendly feedback",
            "<strong>Submit Handling:</strong> Process form data"
        ],
        code: `function LoginForm() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    
    const validate = () => {
        const newErrors = {};
        if (!form.email.includes('@')) {
            newErrors.email = 'Invalid email';
        }
        if (form.password.length < 6) {
            newErrors.password = 'Min 6 characters';
        }
        return newErrors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            console.log('Form valid!', form);
        } else {
            setErrors(newErrors);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
            />
            {errors.email && <span>{errors.email}</span>}
            {/* ... */}
        </form>
    );
}`
    },
    {
        id: 9,
        title: "useRef Hook",
        category: "Hooks",
        level: "Intermediate",
        duration: "20 min",
        description: "Access DOM elements and store mutable values without triggering re-renders.",
        keyPoints: [
            "<strong>DOM Access:</strong> Direct access to elements",
            "<strong>Mutable Values:</strong> Persist across renders",
            "<strong>No Re-renders:</strong> Changing ref doesn't re-render",
            "<strong>Previous Values:</strong> Store previous state/props"
        ],
        code: `function FocusInput() {
    const inputRef = useRef(null);
    const renderCount = useRef(0);
    
    useEffect(() => {
        renderCount.current += 1;
    });
    
    const handleFocus = () => {
        inputRef.current.focus();
    };
    
    return (
        <div>
            <input ref={inputRef} />
            <button onClick={handleFocus}>Focus</button>
            <p>Renders: {renderCount.current}</p>
        </div>
    );
}`
    },
    {
        id: 10,
        title: "Custom Hooks",
        category: "Hooks",
        level: "Intermediate",
        duration: "25 min",
        description: "Extract and reuse stateful logic across components with custom hooks.",
        keyPoints: [
            "<strong>Reusable Logic:</strong> Share stateful logic",
            "<strong>Naming:</strong> Always start with 'use'",
            "<strong>Composition:</strong> Combine multiple hooks",
            "<strong>Testing:</strong> Easier to test in isolation"
        ],
        code: `// Custom hook
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}

// Usage
function App() {
    const [name, setName] = useLocalStorage('name', '');
    return <input value={name} onChange={e => setName(e.target.value)} />;
}`
    },

    // MODULE 3: ADVANCED
    {
        id: 11,
        title: "Context API",
        category: "State Management",
        level: "Advanced",
        duration: "30 min",
        description: "Share global state across components without prop drilling. Perfect for themes, auth, and settings.",
        keyPoints: [
            "<strong>Global State:</strong> Share data across components",
            "<strong>No Prop Drilling:</strong> Skip intermediate components",
            "<strong>Provider Pattern:</strong> Wrap app with Provider",
            "<strong>useContext:</strong> Consume context anywhere"
        ],
        code: `const ThemeContext = createContext();

function App() {
    const [theme, setTheme] = useState('dark');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Navbar />
            <Content />
        </ThemeContext.Provider>
    );
}

function Navbar() {
    const { theme, setTheme } = useContext(ThemeContext);
    
    return (
        <nav className={theme}>
            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
                Toggle Theme
            </button>
        </nav>
    );
}`
    },
    {
        id: 12,
        title: "useReducer Hook",
        category: "State Management",
        level: "Advanced",
        duration: "30 min",
        description: "Manage complex state logic with reducers. Similar to Redux but built into React.",
        keyPoints: [
            "<strong>Complex State:</strong> Multiple related values",
            "<strong>Predictable:</strong> Explicit state transitions",
            "<strong>Reducer:</strong> (state, action) => newState",
            "<strong>Actions:</strong> Describe what happened"
        ],
        code: `function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            throw new Error('Unknown action');
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    
    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    );
}`
    },
    {
        id: 13,
        title: "Performance Optimization",
        category: "Performance",
        level: "Advanced",
        duration: "35 min",
        description: "Optimize with useMemo, useCallback, React.memo, and lazy loading.",
        keyPoints: [
            "<strong>useMemo:</strong> Memoize expensive calculations",
            "<strong>useCallback:</strong> Memoize function references",
            "<strong>React.memo:</strong> Prevent unnecessary re-renders",
            "<strong>Code Splitting:</strong> Lazy load components"
        ],
        code: `// Memoization
const ExpensiveComponent = React.memo(({ data, onClick }) => {
    const sortedData = useMemo(() => {
        return data.sort((a, b) => a.value - b.value);
    }, [data]);
    
    const handleClick = useCallback((id) => {
        onClick(id);
    }, [onClick]);
    
    return <List data={sortedData} onClick={handleClick} />;
});

// Lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
    return (
        <Suspense fallback={<Spinner />}>
            <HeavyComponent />
        </Suspense>
    );
}`
    },
    {
        id: 14,
        title: "React Router",
        category: "Routing",
        level: "Advanced",
        duration: "40 min",
        description: "Build single-page applications with client-side routing, dynamic routes, and navigation.",
        keyPoints: [
            "<strong>BrowserRouter:</strong> Wrap app for routing",
            "<strong>Routes & Route:</strong> Define route paths",
            "<strong>Link & NavLink:</strong> Navigate without reload",
            "<strong>useParams:</strong> Access URL parameters",
            "<strong>Protected Routes:</strong> Authentication guards"
        ],
        code: `import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users/123">User</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

function User() {
    const { id } = useParams();
    return <h1>User ID: {id}</h1>;
}`
    },
    {
        id: 15,
        title: "API Integration & Data Fetching",
        category: "Data Fetching",
        level: "Advanced",
        duration: "45 min",
        description: "Fetch data from APIs, handle loading states, errors, and caching.",
        keyPoints: [
            "<strong>Fetch API:</strong> Make HTTP requests",
            "<strong>Async/Await:</strong> Handle promises",
            "<strong>Loading States:</strong> Show spinners",
            "<strong>Error Handling:</strong> Graceful failures",
            "<strong>Axios:</strong> Popular HTTP client"
        ],
        code: `function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(\`/api/users/\${userId}\`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [userId]);
    
    if (loading) return <Spinner />;
    if (error) return <Error message={error} />;
    if (!user) return <NotFound />;
    
    return <div>{user.name}</div>;
}`
    },
    {
        id: 16,
        title: "Redux Toolkit",
        category: "State Management",
        level: "Advanced",
        duration: "50 min",
        description: "Master Redux Toolkit for large-scale state management with slices, thunks, and RTK Query.",
        keyPoints: [
            "<strong>Store:</strong> Single source of truth",
            "<strong>Slices:</strong> Reducers + actions combined",
            "<strong>Thunks:</strong> Async logic",
            "<strong>RTK Query:</strong> Data fetching & caching",
            "<strong>DevTools:</strong> Time-travel debugging"
        ],
        code: `import { createSlice, configureStore } from '@reduxjs/toolkit';

// Create slice
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: state => { state.value += 1 },
        decrement: state => { state.value -= 1 },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    }
});

// Create store
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});

// Use in component
function Counter() {
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();
    
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => dispatch(increment())}>+</button>
        </div>
    );
}`
    },
    {
        id: 17,
        title: "TypeScript with React",
        category: "TypeScript",
        level: "Advanced",
        duration: "45 min",
        description: "Add type safety to React with TypeScript. Define props, state, and event types.",
        keyPoints: [
            "<strong>Props Types:</strong> Interface for component props",
            "<strong>State Types:</strong> Type useState generics",
            "<strong>Event Types:</strong> Type event handlers",
            "<strong>Generic Components:</strong> Reusable typed components"
        ],
        code: `interface UserProps {
    name: string;
    age: number;
    email?: string;
    onUpdate: (user: User) => void;
}

interface User {
    id: number;
    name: string;
    age: number;
}

const UserCard: React.FC<UserProps> = ({ name, age, email, onUpdate }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdate({ id: 1, name, age });
    };
    
    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            {email && <p>Email: {email}</p>}
        </div>
    );
};`
    },
    {
        id: 18,
        title: "Testing React Apps",
        category: "Testing",
        level: "Advanced",
        duration: "50 min",
        description: "Write tests with Jest and React Testing Library. Test components, hooks, and user interactions.",
        keyPoints: [
            "<strong>Jest:</strong> Test runner and assertions",
            "<strong>React Testing Library:</strong> Test components",
            "<strong>User Events:</strong> Simulate interactions",
            "<strong>Mocking:</strong> Mock API calls and modules",
            "<strong>Coverage:</strong> Track test coverage"
        ],
        code: `import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Counter Component', () => {
    test('renders counter with initial value', () => {
        render(<Counter initialValue={0} />);
        expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
    });
    
    test('increments counter on button click', async () => {
        render(<Counter initialValue={0} />);
        const button = screen.getByRole('button', { name: /increment/i });
        
        await userEvent.click(button);
        
        expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    });
    
    test('calls onUpdate callback', async () => {
        const handleUpdate = jest.fn();
        render(<Counter onUpdate={handleUpdate} />);
        
        const button = screen.getByRole('button', { name: /increment/i });
        await userEvent.click(button);
        
        expect(handleUpdate).toHaveBeenCalledWith(1);
    });
});`
    },
    {
        id: 19,
        title: "Error Boundaries & Error Handling",
        category: "Error Handling",
        level: "Advanced",
        duration: "30 min",
        description: "Catch errors gracefully with error boundaries and implement robust error handling.",
        keyPoints: [
            "<strong>Error Boundaries:</strong> Catch component errors",
            "<strong>Fallback UI:</strong> User-friendly error pages",
            "<strong>Error Logging:</strong> Send to error tracking service",
            "<strong>Recovery:</strong> Reset error state"
        ],
        code: `class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        // Log to error reporting service
        console.error('Error:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong</h1>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

// Usage
<ErrorBoundary>
    <App />
</ErrorBoundary>`
    },
    {
        id: 20,
        title: "Advanced Patterns",
        category: "Patterns",
        level: "Expert",
        duration: "45 min",
        description: "Master HOCs, Render Props, Compound Components, and other advanced React patterns.",
        keyPoints: [
            "<strong>Higher-Order Components:</strong> Wrap components with logic",
            "<strong>Render Props:</strong> Share code via function props",
            "<strong>Compound Components:</strong> Flexible component APIs",
            "<strong>Controlled vs Uncontrolled:</strong> Component control patterns"
        ],
        code: `// Higher-Order Component
function withAuth(Component) {
    return function AuthComponent(props) {
        const { user } = useAuth();
        if (!user) return <Redirect to="/login" />;
        return <Component {...props} user={user} />;
    };
}

// Render Props
function DataProvider({ render }) {
    const [data, setData] = useState(null);
    useEffect(() => { fetchData().then(setData); }, []);
    return render(data);
}

// Compound Components
function Tabs({ children }) {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    );
}
Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage
<Tabs>
    <Tabs.List>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel>Content 1</Tabs.Panel>
    <Tabs.Panel>Content 2</Tabs.Panel>
</Tabs>`
    },
    {
        id: 21,
        title: "Production Build & Deployment",
        category: "Deployment",
        level: "Expert",
        duration: "40 min",
        description: "Build, optimize, and deploy React apps to production. Environment variables, CI/CD, and hosting.",
        keyPoints: [
            "<strong>Build Process:</strong> npm run build optimization",
            "<strong>Environment Variables:</strong> .env files",
            "<strong>Code Splitting:</strong> Reduce bundle size",
            "<strong>Deployment:</strong> Vercel, Netlify, AWS",
            "<strong>CI/CD:</strong> Automated deployments"
        ],
        code: `// .env file
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_KEY=your-api-key

// Usage in code
const apiUrl = process.env.REACT_APP_API_URL;

// package.json scripts
{
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "deploy": "npm run build && vercel --prod"
    }
}

// Vercel deployment
// 1. Install: npm i -g vercel
// 2. Login: vercel login
// 3. Deploy: vercel --prod

// Netlify deployment
// 1. Build command: npm run build
// 2. Publish directory: build
// 3. Deploy via Git or CLI`
    },
    {
        id: 22,
        title: "React Best Practices & Architecture",
        category: "Best Practices",
        level: "Expert",
        duration: "50 min",
        description: "Industry-standard patterns, folder structure, naming conventions, and code organization.",
        keyPoints: [
            "<strong>Folder Structure:</strong> Feature-based organization",
            "<strong>Naming Conventions:</strong> Consistent naming",
            "<strong>Code Splitting:</strong> Lazy load routes",
            "<strong>Performance:</strong> Optimization techniques",
            "<strong>Security:</strong> XSS, CSRF protection",
            "<strong>Accessibility:</strong> ARIA, semantic HTML"
        ],
        code: `// Recommended folder structure
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── Button.module.css
│   │   └── Input/
│   └── layout/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── dashboard/
├── hooks/
├── services/
├── store/
├── utils/
├── types/
└── App.tsx

// Best practices
// 1. Small, focused components
// 2. Custom hooks for reusable logic
// 3. PropTypes or TypeScript
// 4. Consistent naming (PascalCase for components)
// 5. One component per file
// 6. Separate business logic from UI
// 7. Use absolute imports
// 8. Write tests
// 9. Document complex logic
// 10. Keep dependencies updated`
    }
];

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { courseLessons };
}
