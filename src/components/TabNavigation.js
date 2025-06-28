import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Smartphone, UserCheck } from 'lucide-react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'merchant',
      label: 'Merchant Info',
      icon: Building2,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'platform',
      label: 'Platform Info',
      icon: Smartphone,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'account',
      label: 'Account Info',
      icon: UserCheck,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <motion.div
      className="glass p-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex gap-2 p-2 neumorphic-inset rounded-2xl">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                isActive 
                  ? 'glass shadow-lg' 
                  : 'hover:bg-white/50 hover:shadow-md'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5, 
                translateZ: 10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Background Effect */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r opacity-20"
                  style={{ background: `linear-gradient(to right, ${tab.color.split(' ')[1]}, ${tab.color.split(' ')[3]})` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Floating Icon */}
              <motion.div
                className={`relative z-10 ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`}
                animate={isActive ? {
                  y: [0, -5, 0],
                  rotateZ: [0, 5, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={isActive ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {}}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive 
                      ? `bg-gradient-to-r ${tab.color}` 
                      : 'bg-gray-100'
                  }`}
                  whileHover={{ 
                    rotateY: 15, 
                    rotateX: 5,
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
              </motion.div>

              {/* Tab Label */}
              <motion.span
                className={`font-medium text-sm ${
                  isActive ? 'text-gray-800' : 'text-gray-600'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {tab.label}
              </motion.span>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r rounded-full"
                  style={{ background: `linear-gradient(to right, ${tab.color.split(' ')[1]}, ${tab.color.split(' ')[3]})` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  layoutId="activeTab"
                />
              )}

              {/* 3D Glow Effect */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-30"
                  style={{ 
                    background: `linear-gradient(45deg, ${tab.color.split(' ')[1]}, ${tab.color.split(' ')[3]})`,
                    filter: 'blur(20px)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 3D Floating Indicators */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {tabs.map((tab, index) => (
          <motion.div
            key={`indicator-${tab.id}`}
            className={`w-2 h-2 rounded-full ${
              activeTab === tab.id 
                ? `bg-gradient-to-r ${tab.color}` 
                : 'bg-gray-300'
            }`}
            animate={activeTab === tab.id ? {
              scale: [1, 1.5, 1],
              y: [0, -5, 0]
            } : {}}
            transition={activeTab === tab.id ? {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
            style={{ transformStyle: 'preserve-3d' }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TabNavigation; 