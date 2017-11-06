// import { convertObj2Arr } from './util'
import { on } from './events'

export const getDom = function(selector) {
	return document.querySelector(selector)
}

export const getByCls = function(clazz) {
	return getDom(`.${clazz}`)
}

export const getByClsAll = function(clazz) {
	return document.querySelectorAll(`.${clazz}`)
}

export const getByTag = function(tag) {
	const _dom = document.getElementsByTagName(tag)
	return _dom ? _dom[0] : null
}

export const bodyAppend = function(child) {
	const _b = getByTag('body')
	return _b.appendChild(child)
}

export const createEle = function(tag) {
	return document.createElement(tag)
}

export const hasClass = function(dom, clazz) {
	const classname = dom.className.split(' ')
	return classname.indexOf(clazz) >= 0
}

export const addClass = function(dom, clazz) {
	if(hasClass(dom, clazz)) {
		return
	}

	dom.className = dom.className + ' ' + clazz
}

export const removeClass = function(dom, clazz) {
	if(hasClass(dom, clazz)) {
		dom.className = dom.className.replace(new RegExp(clazz), '')
	}
}

export default function(s) {
	const BS = function(selector) {
		this.getDom = function(selector) {
			if(selector.nodeType === 1) {
				return selector
			} else {
				return getDom(selector)
			}
		}
		this.dom = this.getDom(selector)

		this.append = function(tpl) {
			const _c = createEle('div')
			_c.innerHTML = tpl
			bodyAppend(_c)
			return this
		}

		this.css = function(style) {
			if(typeof style !== 'string') {
				for(var i in style) {
					this.dom.style[i] = style[i]
				}
			} else {
				const _args = arguments
				const key = _args[0]
				const value = _args[1]
				this.dom.style[key] = value
			}
			return this
		}

		this.click = function(fn) {
			on(this.dom, 'click', fn)
			return this
		}

		this.remove = function() {
			const parent = this.dom.parentNode
			parent.removeChild(this.dom)
			return this
		}

		this.trigger = function() {
			this.dom.click()
		}

		this.hide = function() {
			console.log(this.dom)
			this.dom.style.display = 'none'
		}

		this.addClass = function(clazz) {
			addClass(this.dom, clazz)
		}
	}
	return new BS(s)
}