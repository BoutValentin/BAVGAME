export class Component {
	tagName;
	attribute;
	children;

	constructor(tagName, attribute, children) {
		this.tagName = tagName;
		this.attribute = attribute;
		this.children = children;
	}

	render() {
		let html = `<${this.tagName} ${this.renderAttributes()}`;
		if (this.children != null) {
			html += `>${this.renderChildren()}</${this.tagName}>`;
		} else {
			html += ' />';
		}
		return html;
	}

	renderAttributes() {
		if (Array.isArray(this.attribute)) {
			return this.attribute.reduce(
				(prevAttribute, currentAtribute) =>
					prevAttribute + this.attributeFromObject(currentAtribute),
				''
			);
		}
		if (this.attribute) {
			return this.attributeFromObject(this.attribute);
		}
		return '';
	}

	attributeFromObject({ name, value }) {
		return `${name}="${value}" `;
	}

	renderChildren() {
		if (this.children instanceof Array) {
			return this.children.reduce(
				(html, child) =>
					html +
					(child instanceof Component
						? child.render()
						: child == null
						? ''
						: child),
				''
			);
		}
		if (this.children instanceof Component) {
			return this.children.render();
		}
		return this.children || '';
	}
}
