// React Playground Component with Live Code Editor
// Allows users to write and execute React code in real-time

function ReactPlayground({ initialCode = '', onRun }) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const runCode = () => {
        setIsRunning(true);
        setError(null);

        try {
            // Create a safe execution environment
            const { useState, useEffect, useRef, useContext, useReducer, useMemo, useCallback } = React;

            // Transpile and execute the code
            const transformedCode = Babel.transform(code, {
                presets: ['react']
            }).code;

            // Create component from code
            const ComponentFunction = new Function(
                'React', 'useState', 'useEffect', 'useRef', 'useContext', 'useReducer', 'useMemo', 'useCallback',
                `${transformedCode}\nreturn typeof UserComponent !== 'undefined' ? UserComponent : null;`
            );

            const UserComponent = ComponentFunction(
                React, useState, useEffect, useRef, useContext, useReducer, useMemo, useCallback
            );

            if (UserComponent) {
                setOutput(<UserComponent />);
            } else {
                setError('No component found. Make sure to define a component called UserComponent');
            }

            if (onRun) onRun(code);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsRunning(false);
        }
    };

    const resetCode = () => {
        setCode(initialCode);
        setOutput(null);
        setError(null);
    };

    return (
        <div className="playground-container">
            <div className="playground-header">
                <h3>🎮 React Playground</h3>
                <div className="playground-actions">
                    <button className="playground-btn" onClick={runCode} disabled={isRunning}>
                        {isRunning ? '⏳ Running...' : '▶️ Run Code'}
                    </button>
                    <button className="playground-btn secondary" onClick={resetCode}>
                        🔄 Reset
                    </button>
                </div>
            </div>

            <div className="playground-editor">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="code-editor"
                    spellCheck="false"
                    placeholder="Write your React code here..."
                />
            </div>

            {error && (
                <div className="playground-error">
                    <strong>❌ Error:</strong> {error}
                </div>
            )}

            {output && !error && (
                <div className="playground-output">
                    <div className="output-header">📺 Output:</div>
                    <div className="output-content">
                        {output}
                    </div>
                </div>
            )}
        </div>
    );
}

// Exercise Component
function Exercise({ exercise, onComplete }) {
    const [code, setCode] = useState(exercise.starterCode);
    const [showHints, setShowHints] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [currentHint, setCurrentHint] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempted, setAttempted] = useState(false);

    const checkSolution = () => {
        setAttempted(true);
        const correct = exercise.validate ? exercise.validate(code) : code.trim() === exercise.solution.trim();
        setIsCorrect(correct);

        if (correct && onComplete) {
            setTimeout(() => onComplete(), 1500);
        }
    };

    const getNextHint = () => {
        if (currentHint < exercise.hints.length - 1) {
            setCurrentHint(currentHint + 1);
        }
        setShowHints(true);
    };

    const useSolution = () => {
        setCode(exercise.solution);
        setShowSolution(true);
    };

    return (
        <div className="exercise-container">
            <div className="exercise-header">
                <h3>💪 Exercise: {exercise.title}</h3>
                <p>{exercise.description}</p>
            </div>

            <div className="exercise-editor">
                <div className="editor-header">
                    <span>✏️ Your Code:</span>
                    <div className="editor-actions">
                        <button className="hint-btn" onClick={getNextHint}>
                            💡 Hint ({currentHint + 1}/{exercise.hints.length})
                        </button>
                        <button className="solution-btn" onClick={useSolution}>
                            👀 Show Solution
                        </button>
                    </div>
                </div>
                <textarea
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setAttempted(false); setIsCorrect(false); }}
                    className="code-editor"
                    spellCheck="false"
                />
            </div>

            {showHints && (
                <div className="hints-box">
                    <strong>💡 Hint {currentHint + 1}:</strong> {exercise.hints[currentHint]}
                </div>
            )}

            {showSolution && (
                <div className="solution-box">
                    <strong>✅ Solution:</strong>
                    <pre><code>{exercise.solution}</code></pre>
                </div>
            )}

            <div className="exercise-actions">
                <button
                    className={`check-btn ${isCorrect ? 'correct' : attempted ? 'incorrect' : ''}`}
                    onClick={checkSolution}
                >
                    {isCorrect ? '✅ Correct!' : attempted ? '❌ Try Again' : '✓ Check Solution'}
                </button>
            </div>

            {isCorrect && (
                <div className="success-message">
                    🎉 Great job! You've completed this exercise!
                </div>
            )}
        </div>
    );
}

// Export components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ReactPlayground, Exercise };
}
