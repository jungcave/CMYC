AI Overview
Framer Motion can be integrated with React Router DOM to create animated page transitions. Here's how it generally works:

1.  Installation:
    Install framer-motion and react-router-dom if you haven't already:
    Code:
    npm install framer-motion react-router-dom

2.  Wrapping Routes with AnimatePresence:
    Import AnimatePresence from framer-motion.
    Wrap your Routes component (or RouterProvider if you're using createBrowserRouter) with AnimatePresence.
    The AnimatePresence component enables exit animations when components are unmounted.
3.  Unique Keys for Route Components:
    Each component rendered by a Route should have a unique key prop. This key needs to change when the route changes.
    The location.pathname from useLocation hook can be used as a key to ensure that each route change triggers the transition.
4.  Using motion Components:
    Wrap the content of your route components with motion.div (or other motion HTML or custom components).
    Use the initial, animate, and exit props on these motion components to define the animations.
    initial specifies the starting state, animate specifies the state when the component is mounted, and exit specifies the state when the component is unmounted.
5.  Example Structure:
    Code

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Page = ({ children }) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }} >
    {children}
    </motion.div>
  );
};

const Home = () => <Page><h1>Home</h1></Page>;
const About = () => <Page><h1>About</h1></Page>;
const Contact = () => <Page><h1>Contact</h1></Page>;

const App = () => {
const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </AnimatePresence>
    );

};

const Root = () => (
<Router>
<App />
</Router>
);

export default Root;
Important Considerations:
Layout Components:
If you have layout components (like a sidebar) that are rendered outside of the AnimatePresence, they may re-render on page changes. You might need to conditionally render them or move them outside of the AnimatePresence.
Performance:
Be mindful of complex animations, as they can impact performance.
Transition Modes:
AnimatePresence has a mode prop which can be set to "sync" or "wait". The "wait" mode will wait for the exit animation to complete before mounting the new component.
Custom Animations:
You can use various animation properties like opacity, x, y, scale, and rotate, along with transition settings, to create a wide range of effects.
This approach provides a basic framework for page transitions. You can customize it further to create more complex and visually appealing animations.

! AnimatePresense mode="wait" sould be directly wrapping unmounting elements