// DATA FORMAT:
// events : [
//      { date: new Date( <year>, <month - 1>, <day>),
//        talks:  /*optional*/ [ ... ],
//        special: /*optional*/ { ... },
//      }
// ]
var bcnjs_events = [
	{
		date: new Date(2014, 0, 9),
    talks: []
	},
  {
    date: new Date(2014, 0, 25),
    special: {
      header: 'AngularJS Special',
      content: ''
		}
  },
	{
		date: new Date(2014, 1, 13),
    talks: []
	},
	{
		date: new Date(2014, 2, 13),
    talks: []
	},
	{
		date: new Date(2014, 3, 10),
    talks: [
{
			title: 'AngularJS and the Declarative / Imperative Impedance Mismatch',
			presenter: {
				username: 'jjenkov',
				displayname: 'Jakob Jenkov'
			},
			description: 'AngularJS uses its HTML directives at the core of its UI generation. That means that you specify how to generate the HTML using HTML. Part of that logic has been moved to the controller functions, but part of it cannot be moved. The result is imperative constructs like ng-if and ng-repeat inside the declarative HTML template. The mismatch between an imperative problem and a declarative tool ends up in a messy solution in the long run. JSP tried the same thing with custom tag libraries, and failed. XSL tried the same thing, and failed too. This talk will get into deeper detail about why I believe that the HTML directives - one of the core elements that AngularJS is praised for - is not such a great solution for UI generation.' 
}
]
	},
	{
		date: new Date(2014, 4, 8),
    talks: []
	},
	{
		date: new Date(2014, 5, 12),
    talks: []
	},
	{
		date: new Date(2014, 6, 10),
    talks: []
	},
	{
		date: new Date(2014, 7, 14),
    talks: []
	},
	{
		date: new Date(2014, 8, 11),
    talks: []
	},
	{
		date: new Date(2014, 9, 9),
    talks: []
	},
	{
		date: new Date(2014, 10, 13),
    talks: []
	},
	{
		date: new Date(2014, 11, 11),
    talks: []
	}
];
