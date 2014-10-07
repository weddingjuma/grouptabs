define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom-class",
	"./_Scene",
	"dijit/registry",
	"dijit/form/ValidationTextBox",
	"dijit/form/DateTextBox",
	"../widgets/ParticipantInput",
	"../widgets/NewParticipantInput",
	"dojo/text!./templates/EditEntry.html"
], function(declare, lang, array, domClass, _Scene, dijitRegistry, ValidationTextBox, DateTextBox, ParticipantFormWidget, NewParticipantFormWidget, template){

return declare(_Scene, {
	
	templateString: template,
	
	name: "editEntry",
	
	constructor: function(){
		this._participantFormWidgets = []
	},

	onShow: function(data){
		if(data){
			this._createParticipantFormWidgets(data)
			this._prefill(data)
			this._data = data
			this._showDeleteButton()
			this.headingNode.innerHTML = "Edit transaction"
		}else{
			this._createParticipantFormWidgets()
			.then(function(){
				if(!this._participantFormWidgets.length){
					this._createNewParticipantFormWidget()
					this._createNewParticipantFormWidget()
				}
				if(this._participantFormWidgets.length < 3){
					this.selectAllButton.domNode.style.display = "none"
				}
			}.bind(this))
			this._hideDeleteButton()
			this.headingNode.innerHTML = "New transaction"
		}
	},

	_prefill: function(data){
		dijitRegistry.byId("editEntryTitle").set("value", data.description)
		dijitRegistry.byId("editEntryDate").set("value", new Date(data.date))
	},
	
	_createParticipantFormWidgets: function(data){
		return this.app.getAccounts()
		.then(function(accounts){
			var isChecked = !data && accounts.length == 2
			accounts.forEach(function(account){
				this._createParticipantFormWidget(account.participant, data, isChecked)
			}, this)
		}.bind(this))
	},

	_createParticipantFormWidget: function(participant, data, isChecked){
		var widgetParams = {
			name: "participants",
			participant: participant
		}
		if(data){
			data.participants.forEach(function(_participant){
				if(_participant.amount && _participant.participant == participant){
					widgetParams.amount = _participant.amount
				}
			})
		}
		var widget = new ParticipantFormWidget(widgetParams)
		var participantJoined
		if(data){
			data.participants.forEach(function(_participant){
				if(_participant.participant === participant){
					participantJoined = true
				}
			})
		}
		if(isChecked || participantJoined){
			widget.joinedButton.set("checked", true)
			if(widgetParams.amount){
				widget.paidButton.set("checked", true)
			}
		}
		widget.placeAt(this.participantsNode)
		this._participantFormWidgets.push(widget)
		setTimeout(function(){
			widget.set("ready", true)
		}, 100)
	},

	_removeParticipantFormWidgets: function(){
		this._participantFormWidgets.forEach(function(widget){
			widget.destroy()
		}, this)
		this._participantFormWidgets = []
	},

	_onNewParticipantClick: function(){
		this._createNewParticipantFormWidget()
		var widget = this._participantFormWidgets[this._participantFormWidgets.length - 1]
		widget.set("focus", true)
	},

	_createNewParticipantFormWidget: function(){
		var widget = new NewParticipantFormWidget({name: "participants"})
		widget.joinedButton.set("checked", true)
		this.connect(widget, "onRemove", this._removeNewParticipantFormWidget)
		widget.placeAt(this.participantsNode)
		this._participantFormWidgets.push(widget)
		setTimeout(function(){
			widget.set("ready", true)
		}, 100)
	},

	_removeNewParticipantFormWidget: function(widget){
		this._participantFormWidgets.forEach(function(_widget){
			if(_widget == widget){
				widget.destroy()
			}
		})
	},

	_onAllClick: function(){
		this._participantFormWidgets.forEach(function(widget){
			widget.set("selected", true)
		})
	},

	_onOkClick: function(){
		this._saveEntry()
		this.reset()
		this.close(this, this.app.homeView)
	},

	_onDeleteClick: function(){
		this.app.removeTransaction(this._data)
		this.reset()
		this.close(this, "list")
	},
	
	_onCancelClick: function(){
		this.reset()
		this.close(this, this.app.homeView)
	},
	
	_saveEntry: function(){
		var data = this.get("value")
		data.participants = array.filter(data.participants, function(participant){
			return !!participant
		})
		data.type = "SHARED"
		data.date = data.date.getTime()
		if(this._data){
			data._id = this._data._id
			data._rev = this._data._rev
		}
		this.app.saveTransaction(data)
	},

	_showDeleteButton: function(){
		this.deleteButton.domNode.style.display = ""
		domClass.remove(this.saveButton.domNode, "full-width-margin")
		domClass.add(this.buttonRowNode, "button-row")
	},

	_hideDeleteButton: function(){
		this.deleteButton.domNode.style.display = "none"
		domClass.add(this.saveButton.domNode, "full-width-margin")
		domClass.remove(this.buttonRowNode, "button-row")
	},
	
	reset: function(){
		this.inherited(arguments)
		delete this._data
		this._hideDeleteButton()
		this.selectAllButton.domNode.style.display = ""
		this._removeParticipantFormWidgets()
	}

})

})
