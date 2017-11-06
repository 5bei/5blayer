import $ from './dom'

export default {
    timerCache: [],
    modal: function(params) {
        const _this = this
        const url = params.url
        const hasTitle = typeof params.title === 'boolean' ? params.title : ' '
        const title = typeof params.title === 'boolean' ? '' : params.title
        const content = url ? '' : params.msg
        const footer_tpl = params.footer ? params.footer : ''
        const maskClose = params.maskClose != undefined ? params.maskClose : true
        const cusStyle = params.style ? params.style : {}
        const modalId = `modal-wrap${new Date().getTime()}`
        const boxId = `modal-box${new Date().getTime()}`
        const tpl = `<div class="b5-modal current" id="${boxId}">
                <div id="${modalId}" class="b5-modal-wrap">
                    <div class="b5-modal-header" style="display: ${hasTitle && hasTitle == ' ' ? 'flex': 'none'}">
                      <h1>${title || '提示'}</h1>
                      <i class="iconfont modal-close"></i>
                    </div>
                    <div class="b5-modal-body clearfix" id="modal-body">
                      ${content}
                    </div>

                    <div class="foot_succ">
                      ${footer_tpl}
                    </div>
                </div>
            </div>`
        const $modal = $(document.body).append(tpl)

        $(`#${modalId}`).css(cusStyle)
        $('.modal-close').click(function() {
            $(`#${boxId}`).remove()
            _this.timerCache.forEach(() => {
                // $timeout.cancel(_timer)
            })
            _this.timerCache = []
        })
        if(maskClose) {
            $(`#${boxId}`).click(function(e) {
                //增加冒泡判断
                if(e.target.id === boxId) {
                    $('.modal-close').trigger('click')
                }
            })
        }
        $modal.close = function() {
            $('.modal-close').trigger('click')
        }
        return $modal
    },
    alert: function (msg, title) {
        const $alert = this.modal({
            footer: '<button class="button alert-btn">确定</button>',
            msg,
            title,
            maskClose: false,
            style: {
                width: '480px',
                minHeight: '180px',
                marginLeft: '-240px'
            }
        })
        $('.alert-btn').click(function() {
            $alert.close()
        })
    },
    confirm: function(params) {
        const styles = params.style || {
            width: '480px',
            minHeight: '180px',
            marginLeft: '-240px'
        }

        const $confirm = this.modal({
            title: params.title,
            msg: params.msg,
            style: styles,
            maskClose: false,
            footer: `<button class="button modal-cancel-btn">${params.cancelText || '取消'}</button><button class="button modal-confirm-btn">${params.okText || '确认'}</button>`
        })
        const createFn = function(fname) {
            return function(e) {
                if(params[fname]) {
                    params[fname](e)
                }
                $confirm.close()
            }
        }
        const okFn = createFn('okFn')
        const cancelFn = createFn('cancelFn')
        $('.modal-cancel-btn').click(cancelFn)
        $('.modal-confirm-btn').click(okFn)
    },
    loading: function(idx) {
        const loadObj = [
            '<div class="loading0"><span></span><span></span><span></span><span></span><span></span></div>',
            '<div class="loading1"><span></span><span></span><span></span><span></span><span></span></div>',
            '<div class="loading2"><span></span><span></span><span></span><span></span><span></span></div>',
            '<div class="loading3"><span></span><span></span><span></span><span></span><span></span></div>',
            '<div class="loading4"><div><span></span></div><div><span></span></div><div><span></span></div><div><span></span></div></div>'
        ]
        const _idx = idx || 0
        const $load = this.modal({
            msg: loadObj[_idx],
            style: {
                background: 'transparent',
                width: '200px',
                marginLeft: '-100px'
            },
            maskClose: false
        })
        $('.b5-modal-header').hide()
        $('.b5-modal').addClass('loading-modal')
        return $load
    }
}