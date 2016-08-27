import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

var App = React.createClass({
	getInitialState: function() {
		return {
			results: []
		}
	},
	handleSubmitButton: function(query) {
		$.ajax({
			url: './search?borough=' + query,
			type: 'POST',
			dataType: 'json',
			data: query,
			success: function(data) {
				this.setState( { results: data } )
			}.bind(this),
			error: function(err) { console.log(err) 
			}.bind(this)
		})
	},
	render: function() {
		return (
			<div>
				<SearchBox submitFunction={this.handleSubmitButton} />
				<ResultPane results={this.state.results} />
			</div>
		)
	}
})

var SearchBox = React.createClass({
	getInitialState: function() {
		return {
			text: ""
		}
	},
	handleTextbox: function(e) {
		this.setState({text: e.target.value})
	},
	handleSubmit: function(e) {
		e.preventDefault()
		this.props.submitFunction(this.state.text)
	},
	render: function() {
		return (
			<div id="search-box">
				<form action="./search" className="search-form">
					<input type="text" placeholder="Search me..." onChange={this.handleTextbox} className="search-input"/>
					<p>{this.state.text}</p>
					<input type="submit" onClick={this.handleSubmit} />
				</form>
			</div>
		)
	}
})

var ResultPane = React.createClass({
	render: function () {
		return (
			<div id="result-pane">
				<h2>Results</h2>
				<ResultItem results={this.props.results} />			
			</div>
		)
	}
})

var ResultItem = React.createClass({
	makeResults: function(result) {
		return (
			<li key={result.name} >
				<strong>{result.name}</strong> | {result.cuisine}
				<Grades grades={result.grades} />
			</li>
		)
	},
	render: function() {
		return (
			<ul id="result-items">
				{this.props.results.map(this.makeResults)}
			</ul>
		)
	}
})

var Grades = React.createClass({
	makeGrades: function(grade, i) {
		return (
			<li key={i}>
				{i}. <br/>
				Grade: {grade.grade} <br/>
				Score: {grade.score}
			</li>
		)
	},
	render: function() {
		return (
			<ul className="grades">
				{this.props.grades.map(this.makeGrades)}
			</ul>
		)

	}
})

ReactDOM.render(<App />, document.getElementById('app'))