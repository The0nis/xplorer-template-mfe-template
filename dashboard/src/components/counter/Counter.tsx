// features/counter/Counter.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { decrement, increment, incrementByAmount } from '../../features/dashboard/dashboardSlice';

/**
 * Counter Component
 * 
 * This component is designed as a child microfrontend. It is meant to be integrated and
 * rendered within a parent microfrontend container. The parent container manages the overall 
 * layout and state, while this component provides specific functionality related to counting.
 * 
 * To use this component as a microfrontend, ensure it is included in the parent container's 
 * configuration and properly integrated with the microfrontend architecture.
 */
const Counter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Display a message indicating this is a microfrontend */}
      <div className="text-xl font-semibold mb-4 text-red-600">
        This is the dashboard microfrontend. It is hosted within a parent microfrontend container.
      </div>
      
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Counter: {count}</h1>
      <div className="space-y-4">
        <button
          onClick={() => dispatch(increment())}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Increment by 5
        </button>
      </div>
    </div>
  );
};

export default Counter;
