define([
  'react'
],

function (React) {
  'use strict';

  return React.createClass({

    render: function () {
      return (
        React.createElement('span', {className: 'participationStatus'},
          React.createElement('span', {className: 'joinedButtonWrapper' + (this.props.status === 2 ? ' hidden' : '')},
            React.createElement('button', {
              type: 'button',
              className: this.props.status > 0 ? ' selected' : '',
              ref: 'joined',
              onClick: this.props.handleJoinedChange
            }, 'joined')
          ),
          React.createElement('button', {
            type: 'button',
            className: 'paid-button' + (this.props.status === 2 ? ' selected' : ''),
            ref: 'paid',
            onClick: this.props.handlePaidChange
          }, 'paid'),
          React.createElement('span', {className: 'amountInput' + (this.props.status < 2 ? ' hidden' : '')},
            React.createElement('input', {
              type: 'number',
              disabled: this.props.status !== 2 ? 'disabled' : '',
              defaultValue: this.props.amount,
              ref: 'amount'
            })
          )
        )
      );
    },

    getAmount: function () {
      return parseFloat(this.refs.amount.value || 0);
    },

    focusAmount: function () {
      this.refs.amount.focus();
    }

  });

});
