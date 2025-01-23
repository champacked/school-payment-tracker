import React, { useState } from 'react';
import { School } from 'lucide-react';
import { getTransactionsBySchool } from '../services/api';
import TransactionTable from '../components/TransactionTable';
import { useTheme } from '../hooks/useTheme';

export default function SchoolTransactions() {
  const { isDarkMode } = useTheme();
  const [schoolId, setSchoolId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!schoolId) return;
    
    try {
      setLoading(true);
      const data = await getTransactionsBySchool(schoolId);
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching school transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        School Transactions
      </h2>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <School className={`absolute left-3 top-3 w-5 h-5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Enter School ID..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 placeholder-gray-500'
            }`}
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : transactions.length > 0 ? (
        <TransactionTable transactions={transactions} isDarkMode={isDarkMode} />
      ) : (
        <div className={`text-center py-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {schoolId ? 'No transactions found for this school' : 'Enter a school ID to view transactions'}
        </div>
      )}
    </div>
  );
}