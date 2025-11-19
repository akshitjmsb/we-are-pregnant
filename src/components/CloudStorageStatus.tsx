import React, { useState } from 'react';
import { HybridStorageManager } from '../utils/hybridStorage';

export function CloudStorageStatus() {
  const [isClearing, setIsClearing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearData = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    try {
      setIsClearing(true);
      await HybridStorageManager.clearUserData();
      setShowConfirm(false);
      // Optionally show a success message
      alert('All your data has been cleared from the cloud.');
    } catch (error) {
      console.error('Failed to clear data:', error);
      alert('Failed to clear data. Please try again.');
    } finally {
      setIsClearing(false);
    }
  };

  const userId = HybridStorageManager.getCurrentUserId();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-800 mb-1">
            🌐 Cloud Storage Active
          </h3>
          <p className="text-xs text-blue-600 mb-2">
            Your data is automatically saved to the cloud and synced across all your devices.
          </p>
          <p className="text-xs text-gray-500">
            User ID: {userId.substring(0, 20)}...
          </p>
        </div>
        
        <div className="ml-4">
          <button
            onClick={handleClearData}
            disabled={isClearing}
            className={`text-xs px-3 py-1 rounded ${
              showConfirm
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${isClearing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isClearing ? 'Clearing...' : showConfirm ? 'Confirm Clear' : 'Clear Data'}
          </button>
          {showConfirm && (
            <button
              onClick={() => setShowConfirm(false)}
              className="text-xs px-3 py-1 ml-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
