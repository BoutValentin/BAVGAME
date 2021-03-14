import { Component } from '../global';

export class EmptyFavoritesList extends Component {
	constructor() {
		super(
			'div',
			'',
			'<p>You don\'t have any favorites ): <br /> You can add some on the <a id="returnHomePage" href = "" >homepage</a></p>'
		);
	}
}
