'use client'

import { useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'

const transactionTypes = {
  send: { icon: ArrowUpIcon, color: 'text-red-500' },
  receive: { icon: ArrowDownIcon, color: 'text-green-500' },
  swap: { icon: ArrowsRightLeftIcon, color: 'text-blue-500' }
}

const transactions = {
  usdc: [
    { id: 1, type: 'receive', amount: 500.00, from: 'Client A', date: '2023-06-15', time: '14:30' },
    { id: 2, type: 'send', amount: 200.50, to: 'Supplier B', date: '2023-06-14', time: '09:15' },
    { id: 3, type: 'swap', amount: 300.75, from: 'SOL', to: 'USDC', date: '2023-06-13', time: '11:45' },
    { id: 4, type: 'receive', amount: 1000.00, from: 'Client C', date: '2023-06-12', time: '16:20' },
    { id: 5, type: 'send', amount: 150.25, to: 'Contractor D', date: '2023-06-11', time: '13:10' },
  ],
  sol: [
    { id: 1, type: 'receive', amount: 10.5, from: 'Wallet X', date: '2023-06-15', time: '15:45' },
    { id: 2, type: 'send', amount: 5.25, to: 'Exchange Y', date: '2023-06-14', time: '10:30' },
    { id: 3, type: 'swap', amount: 8.75, from: 'USDC', to: 'SOL', date: '2023-06-13', time: '12:15' },
    { id: 4, type: 'receive', amount: 20.0, from: 'Wallet Z', date: '2023-06-12', time: '17:40' },
    { id: 5, type: 'send', amount: 3.5, to: 'Friend W', date: '2023-06-11', time: '14:25' },
  ]
}

function TransactionRow({ transaction, currency }) {
  const { icon: Icon, color } = transactionTypes[transaction.type]
  
  return (
    <tr className="border-b border-white/10">
      <td className="py-4 pl-4 pr-3 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-2 ${color} bg-white/10`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="font-medium text-white capitalize">{transaction.type}</span>
        </div>
      </td>
      <td className="px-3 py-4 text-sm">
        <div className="text-white font-medium">
          {transaction.type === 'send' ? '-' : '+'}{transaction.amount} {currency}
        </div>
        <div className="text-gray-400">
          {transaction.type === 'send' ? `To: ${transaction.to}` : 
           transaction.type === 'receive' ? `From: ${transaction.from}` : 
           `${transaction.from} to ${transaction.to}`}
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-400">
        <div>{transaction.date}</div>
        <div>{transaction.time}</div>
      </td>
    </tr>
  )
}

export default function TransactionHistory() {
  const [activeTab, setActiveTab] = useState('usdc')

  return (
    <div className="w-full mx-auto mt-8">
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 blur-3xl" />
        
        <div className="relative p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Transaction History</h2>
          
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'usdc' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              onClick={() => setActiveTab('usdc')}
            >
              USDC
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'sol' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              onClick={() => setActiveTab('sol')}
            >
              SOL
            </button>
          </div>
          
          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6">Type</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Amount / Details</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Date / Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions[activeTab].map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction} currency={activeTab.toUpperCase()} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

