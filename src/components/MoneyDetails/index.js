// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balenceAmount, incomeAMount, expensesAMount} = props

  return (
    <div className="money-details-container">
      <div className="balence-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Balance</p>
          <p className="details-money" data-testid="balanceAmount">
            Rs {balenceAmount}
          </p>
        </div>
      </div>
      <div className="income-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Income</p>
          <p className="details-money" data-testid="balanceAmount">
            Rs {incomeAMount}
          </p>
        </div>
      </div>
      <div className="expenses-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Expense</p>
          <p className="details-money" data-testid="balanceAmount">
            Rs {expensesAMount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
