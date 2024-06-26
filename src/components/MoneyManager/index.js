import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updateTransactionList = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    this.setState({
      transactionList: updateTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({
      optionId: event.target.value,
    })
  }

  onChangeAmountInput = event => {
    this.setState({
      amountInput: event.target.value,
    })
  }

  onChangetitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  getExpense = () => {
    const {transactionList} = this.state
    let expensesAMount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAMount += eachTransaction.amount
      }
    })
    return expensesAMount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAMount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAMount += eachTransaction.amount
      }
    })
    return incomeAMount
  }

  getBalence = () => {
    const {transactionList} = this.state
    let balenceAmount = 0
    let incomeAMount = 0
    let expensesAMount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAMount += eachTransaction.amount
      } else {
        expensesAMount += eachTransaction.amount
      }
    })

    balenceAmount = incomeAMount - expensesAMount

    return balenceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const expensesAMount = this.getExpense()
    const incomeAMount = this.getIncome()
    const balenceAmount = this.getBalence()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="header-content">
              Welcome back to your
              <span className="money-manager-text"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            expensesAMount={expensesAMount}
            incomeAMount={incomeAMount}
            balenceAmount={balenceAmount}
          />
          <div className="transaction-details">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="trasaction-heading"> Add Trasaction </h1>
              <label className="input-label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input"
                value={titleInput}
                onChange={this.onChangetitleInput}
                placeholder="TITLE"
              />
              <label className="input-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input"
                value={amountInput}
                onChange={this.onChangeAmountInput}
                placeholder="AMOUNT"
              />
              <label className="input-label" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="history-transactions">
              <h1 className="trasaction-heading">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
