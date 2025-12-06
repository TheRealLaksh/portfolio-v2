import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from '../3d/Background';
import Preloader from '../ui/Preloader';
import Navbar from './Navbar';
import SocialSidebar from './SocialSidebar';
import Footer from './Footer'; // Import Footer

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-slate-300">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
         <motion.div 
            className="fixed inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
         >
            <Background />
         </motion.div>
      )}

      {!loading && (
        <>
          <Navbar />
          <SocialSidebar />
          
          <motion.main 
            className="relative z-10 flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {children}
          </motion.main>

          {/* Footer is now part of the layout flow */}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;