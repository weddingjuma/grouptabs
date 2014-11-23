define([
  'react'
],

function (React) {
  'use strict';

  return React.createClass({

    render: function () {
      return (
        React.createElement('div', {className: 'scene landingScene' + (this.props.visible ? '' : ' hidden')},
          React.createElement('div', {className: 'header'},
            React.createElement('h2', null, 'Grouptabs')
          ),
          React.createElement('div', {className: 'empty-info'},
            React.createElement('article', null,
              React.createElement('p', null,
                'A tab consists of transactions. When you add a transaction you also define the people that are part of it, the participants.'
              )
            )
          ),
          React.createElement('div', {className: 'row'},
            React.createElement('button', {className: 'full-width-margin create', onClick: this.props.handleNewEntryClick},
              'Start by adding your first transaction'
            )
          )
        )
      );
    }

  });

});