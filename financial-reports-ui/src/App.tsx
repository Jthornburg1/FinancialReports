import { useEffect, useState } from 'react'
import './App.css'

type Summary = {
  count: number
  netAmount: number
}

type AccountReport = {
  account: string
  netAmount: number
}

type Transaction = {
  id: number
  account: string
  amount: number
}

function App() {
  const [accounts, setAccounts] = useState<AccountReport[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/reports/summary')
      .then(response => {
        if (!response.ok) {
          throw new Error('Unable to load report')
        }
        return response.json()
      })
      .then((data: Summary) => setSummary(data))
      .catch(() => setError('Unable to load report'))
  }, [])

  useEffect(() => {
  fetch('/reports/accounts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Unable to load account report')
        }
        return response.json()
      })
      .then((data: AccountReport[]) => setAccounts(data))
      .catch(() => setError('Unable to load account report'))
  }, [])

  useEffect(() => {
  fetch('/transactions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Unable to load transactions')
        }
        return response.json()
      })
      .then((data: Transaction[]) => setTransactions(data))
      .catch(() => setError('Unable to load transactions'))
  }, [])

  return (
    <main>
      <h1>Financial Reports</h1>

      {error ? (
        <p>{error}</p>
      ) : summary ? (
        <>
          <p>Transactions: {summary.count}</p>
          <p>Net amount: ${summary.netAmount.toFixed(2)}</p>
          <h2>Account totals</h2>
          {accounts.map(account => (
            <p key={account.account}>
              {account.account}: ${account.netAmount.toFixed(2)}
            </p>
          ))}
          <h2>Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Account</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.account}</td>
                  <td>${transaction.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading report...</p>
      )}
    </main>
  )
}

export default App
