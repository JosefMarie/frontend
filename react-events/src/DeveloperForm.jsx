import React, { useState, useEffect, useCallback, useRef } from 'react';
import './DeveloperForm.css';

// 4. USING CUSTOM HOOKS FOR EVENT LISTENERS
// A custom hook to implement Debouncing for the search/filter feature
function useDebounce(value, delay) { // value: the input value to debounce, delay: time in ms to wait before updating
  const [debouncedValue, setDebouncedValue] = useState(value); // State to hold the debounced value
  
  useEffect(() => {
    // Set a timer to update the value only after the delay passes
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Update the debounced value after the specified delay
    }, delay);
    
    // Clear the timer if the user types again before the delay finishes
    return () => clearTimeout(handler);
  }, [value, delay]); // Re-run the effect whenever the value or delay changes
  
  return debouncedValue; // Return the debounced value to the component using this hook
}

export const DeveloperForm = () => {
  // 2. CONTROLLED COMPONENTS
  // React state acts as the "single source of truth" for all form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    role: 'frontend',
    newsletter: false,
  });

  const [skills, setSkills] = useState([
    { id: 1, name: 'React.js' },
    { id: 2, name: 'Node.js' }
  ]);
  const [newSkill, setNewSkill] = useState('');
  
  // Custom Hook Application (Debouncing)
  const debouncedSkillSearch = useDebounce(newSkill, 500);

  // Throttling State & Ref
  const [scrollDepth, setScrollDepth] = useState(0);
  const throttleTimeout = useRef(null);

  // --- EVENT HANDLERS ---

  // FORM EVENTS & CONTROLLED COMPONENTS
  const handleChange = (e) => {
    // Synthetic Event (e) provides cross-browser compatibility
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    alert(`Registration Submitted for: ${formData.username}`);
  };

  // CLIPBOARD EVENTS
  const handlePastePrevent = (e) => {
    e.preventDefault(); // Synthetic Event blocks the paste action
    alert("Please type your email manually to confirm.");
  };

  // FOCUS EVENTS
  const handleFocus = (e) => e.target.classList.add('active-focus');
  const handleBlur = (e) => e.target.classList.remove('active-focus');

  // KEYBOARD EVENTS
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Stop 'Enter' from submitting the whole form prematurely
      if (newSkill.trim()) addSkill();
    }
  };

  // THROTTLING & SCROLL EVENTS
  const handleScroll = (e) => {
    // Throttle: Only process the scroll event once every 200ms
    if (!throttleTimeout.current) {
      throttleTimeout.current = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollDepth(Math.round(progress));
        throttleTimeout.current = null;
      }, 200);
    }
  };

  // EVENT BUBBLING & TOUCH EVENTS
  const handleParentClick = () => alert("Parent container clicked! (Bubbling occurred)");
  
  const handleSecureAction = (e) => {
    e.stopPropagation(); // Stops the click from bubbling up to the Parent container
    alert("Secure Action Executed. Bubbling stopped.");
  };

  // 5. HANDLING EVENTS ON DYNAMIC LISTS & 3. PASSING ARGUMENTS
  const addSkill = () => {
    if (!newSkill) return;
    setSkills(prev => [...prev, { id: Date.now(), name: newSkill }]);
    setNewSkill('');
  };

  const removeSkill = (idToRemove) => {
    // ID is passed as an argument from the inline arrow function in the map loop
    setSkills(prev => prev.filter(skill => skill.id !== idToRemove));
  };

  // Effect to demonstrate Debounce firing
  useEffect(() => {
    if (debouncedSkillSearch) {
      console.log(`Making API call to check if skill '${debouncedSkillSearch}' is valid...`);
    }
  }, [debouncedSkillSearch]);

  return (
    <div className="form-container">
      <h2>Developer Registration</h2>
      
      {/* FORM EVENTS: onSubmit triggers form validation and submission */}
      <form onSubmit={handleSubmit} className="dev-form">
        
        <div className="input-group">
          <label>Username (Text Input)</label>
          <input 
            type="text" 
            name="username"
            value={formData.username} // Controlled Component
            onChange={handleChange}
            onFocus={handleFocus} // Focus Event
            onBlur={handleBlur}   // Focus Event
            required 
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="input-group">
          <label>Confirm Email (Clipboard Event Disabled)</label>
          <input 
            type="email" 
            name="confirmEmail"
            value={formData.confirmEmail} 
            onChange={handleChange}
            onPaste={handlePastePrevent} // Clipboard Event
            required 
          />
        </div>

        <div className="input-group">
          <label>Specialization (Select Box)</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Fullstack Developer</option>
          </select>
        </div>

        <div className="input-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="newsletter"
              checked={formData.newsletter} 
              onChange={handleChange}
            />
            Subscribe to API Updates (Checkbox)
          </label>
        </div>

        <hr className="divider" />

        {/* DYNAMIC LISTS & KEYBOARD EVENTS */}
        <div className="input-group">
          <label>Tech Stack (Keyboard Event: Press Enter to Add)</label>
          <div className="flex-row">
            <input 
              type="text" 
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown} // Keyboard Event
              placeholder="e.g. TypeScript"
            />
            <button type="button" onClick={addSkill} className="btn-add">Add</button>
          </div>
          <span className="debounce-log">
            Debounced Search State: {debouncedSkillSearch || 'Waiting for input pause...'}
          </span>
          
          <ul className="dynamic-list">
            {skills.map(skill => (
              <li key={skill.id}>
                {skill.name}
                {/* 3. PASSING ARGUMENTS TO EVENT HANDLERS */}
                <button 
                  type="button" 
                  onClick={() => removeSkill(skill.id)} 
                  className="btn-delete"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        <hr className="divider" />

        {/* SCROLL EVENTS & THROTTLING */}
        <div className="input-group">
          <label>Terms of Service (Scroll Event & Throttling)</label>
          <div className="scroll-box" onScroll={handleScroll}>
            <p>Scroll down to agree to the developer terms...</p>
            <div style={{ height: '300px' }}></div>
            <p>End of Terms.</p>
          </div>
          <span className="scroll-progress">Read Progress: {scrollDepth}%</span>
        </div>

        {/* EVENT BUBBLING & TOUCH EVENTS */}
        <div className="bubbling-container" onClick={handleParentClick}>
          <p>Parent Container (Has onClick handler)</p>
          <button 
            type="button" 
            onClick={handleSecureAction} 
            onTouchStart={handleSecureAction} // Touch Event optimized
            className="btn-secure"
          >
            Click Me (e.stopPropagation applied)
          </button>
        </div>

        {/* MOUSE EVENTS */}
        <button 
          type="submit" 
          className="btn-submit"
          onMouseEnter={(e) => e.target.classList.add('hover-glow')} // Mouse Event
          onMouseLeave={(e) => e.target.classList.remove('hover-glow')} // Mouse Event
        >
          Finalize Registration
        </button>
        
      </form>
    </div>
  );
};