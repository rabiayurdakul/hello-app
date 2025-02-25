<template>
  <div
      :class="classes"
  >
    <table
        v-once
        :id="tableId"
        ref="table"
        :class="className"
        cellpadding="0"
    >
      <thead
          :class="theadClassName"
      >
      <tr>
        <th
            v-for="(field, i) in options.columns"
            :key="'head_'+i"
            :class="field.classHeaderName"
        >
          <slot
              :name="'HEAD_'+field.name"
              :field="field"
              :i="i"
          >
            <input
                v-if="field.name === '_select_checkbox'"
                type="checkbox"
                class="select-all-checkbox d-print-none"
            >
            <div
                v-else
                v-html="field.label"
            />
          </slot>
        </th>
      </tr>
      </thead>
      <tfoot
          v-if="!hideTfoot"
          :class="tfootClassName"
      >
      <tr>
        <th
            v-for="(field, i) in options.columns"
            :key="'foot_'+i"
            :class="field.classFooterName"
        >
          <slot
              :name="'FOOT_'+field.name"
              :field="field"
              :i="i"
          >
            <input
                v-if="columnSearch && (field.searchable || typeof field.searchable === 'undefined')"
                :placeholder="field.label"
                :class="columnSearchClassName"
                type="search"
            >
            <div
                v-else-if="!columnSearch"
                v-html="field.label"
            />
          </slot>
        </th>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
let myUniqueId = 1
export default {
  name: 'VdtnetTable',
  props: {
    /**
     * The table id
     *
     * @type String
     */
    id: {
      type: String,
      default: null
    },
    /**
     * Set the container classes.
     *
     * @type String
     */
    containerClassName: {
      type: String,
      default: 'table-responsive d-print-inline'
    },
    /**
     * Set the input column search classes.
     *
     * @type String
     */
    columnSearchClassName: {
      type: String,
      default: 'form-control form-control-sm'
    },
    /**
     * Set the tfoot classes.
     *
     * @type String
     */
    tfootClassName: {
      type: String,
    },
    /**
     * Set the thead classes.
     *
     * @type String
     */
    theadClassName: {
      type: String,
    },
    /**
     * Set the table classes you wish to use, default with bootstrap4
     * but you can override with: themeforest, foundation, etc..
     *
     * @type String
     */
    className: {
      type: String,
      default: 'table table-striped table-bordered nowrap w-100'
    },
    /**
     * the options object: https://datatables.net/manual/options
     *
     * @type Object
     */
    opts: {
      type: Object
    },
    /**
     * List all fields to be converted to opts columns
     *
     * @type Object
     */
    fields: {
      type: Object
    },
    /**
     * Pass in DataTables.Net jQuery to resolve any conflict from
     * multiple jQuery loaded in the browser
     *
     * @type Object
     */
    jquery: {
      type: Object
    },
    /**
     * Pass in Vue to resolve any conflict from multiple loaded
     *
     * @type Object
     */
    vue: {
      type: Object
    },
    /**
     * The select-checkbox column index (start at 1)
     * Current implementation require datatables.net-select
     *
     * @type Number
     */
    selectCheckbox: {
      type: Number
    },
    /**
     * Provide custom local data loading.  Warning: this option has not been
     * thoroughly tested.  Please use ajax and serverSide instead.
     *
     * @type Function
     */
    dataLoader: {
      type: Function
    },
    /**
     * true to hide the footer of the table
     *
     * @type Boolean
     */
    hideFooter: {
      type: Boolean
    },
    /**
     * true to hide the tfoot of the table
     *
     * @type Boolean
     */
    hideTfoot: {
      type: Boolean,
      default: true
    },
    /**
     * true to hide the individual column search of the table
     *
     * @type Boolean
     */
    columnSearch: {
      type: Boolean,
      default: false
    },
    /**
     * The details column configuration of master/details.
     *
     * @type {Object}
     */
    details: {
      type: Object
    }
  },
  data() {
    // initialize defaults
    return {
      tableId: null,
      options: {
        /*eslint-disable */
        dom: "tr<'row vdtnet-footer'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'pl>>",
        /*eslint-enable */
        columns: [],
        language: {
          infoFiltered: ''
        },
        lengthMenu: [ [15, 100, 500, 1000, -1], [15, 100, 500, 1000, 'All'] ],
        pageLength: 15,
        buttons: []  // remove any button defaults
      },
      dataTable: null,
      vdtnet: this
    }
  },
  computed: {
    jq() {
      return this.jquery || window.jQuery
    },
    myVue() {
      return this.vue || window.Vue
    },
    classes() {
      const that  = this
      let classes = `${that.containerClassName} vdtnet-container`
      if (this.hideFooter) {
        classes += ' hide-footer'
      }
      return classes
    }
  },
  created() {
    const that = this
    const jq   = that.jq
    let startCol = 0
    let icol     = 0
    that.tableId = that.id || `vdtnetable${myUniqueId++}`
    // allow user to override default options
    if (that.opts) {
      that.options = jq.extend({}, that.options, that.opts)
    }
    that.options.order = that.options.order || [[startCol, 'asc']]
    if (that.fields) {
      const fields = that.fields
      let cols     = that.options.columns
      let orders   = that.options.order
      for (let k in fields) {
        const field = fields[k]
        field.name  = field.name || k
        // disable search and sort for local field
        if (field.isLocal) {
          field.searchable = false
          field.sortable  = false
        }
        // generate
        let col = {
          label:      field.label || field.name,
          data:       field.data || field.name,
          width:      field.width,
          name:       field.name,
          className:  field.className,
          index:      field.index || (icol + 1)
        }
     /*   if (field.hasOwnProperty('defaultContent')) {
          col.defaultContent = field.defaultContent
        }
        if (field.hasOwnProperty('sortable')) {
          col.orderable = field.sortable
        }
        if (field.hasOwnProperty('visible')) {
          col.visible = field.visible
        }
        if (field.hasOwnProperty('searchable')) {
          col.searchable = field.searchable
        }
        if (field.hasOwnProperty('editField')) {
          col.editField = field.editField
        }
        if (field.hasOwnProperty('classHeaderName')) {
          col.classHeaderName = field.classHeaderName
        }
        if (field.hasOwnProperty('classFooterName')) {
          col.classFooterName = field.classFooterName
        }*/
        if (field.template) {
          col.template = field.template
        }
        if (field.render) {
          col.render = field.render
        }
        // console.log(col)
        cols.push(col)
        if (field.defaultOrder) {
          orders.push([icol, field.defaultOrder])
        }
        icol++
      }
    }
    if (that.selectCheckbox) {
      that.selectCheckbox = that.selectCheckbox || 1
      // create checkbox column
      const col = {
        orderable: false,
        searchable: false,
        name: '_select_checkbox',
        className: 'select-checkbox d-print-none',
        data: null,
        defaultContent: '',
        index: (that.selectCheckbox - 1)
      }
      that.options.columns.splice(that.selectCheckbox - 1, 0, col)
      // console.log(that.options.columns)
      that.options.select = that.options.select || { style: 'os', selector: 'td.select-checkbox' }
      if (that.selectCheckbox === 1) {
        startCol++
      }
    }
    // handle master details
    if (that.details) {
      that.details.index = that.details.index || 1
      // create details column
      const col = {
        orderable: false,
        searchable: false,
        name: '_details_control',
        className: 'details-control d-print-none',
        data: null,
        defaultContent: that.details.icons || '<span class="details-plus" title="Show details">+</span><span class="details-minus" title="Hide details">-</span>',
        index: (that.details.index - 1)
      }
      that.options.columns.splice(that.details.index - 1, 0, col)
      if (that.details.index === 1) {
        startCol++
      }
    }
    if (startCol > 0) {
      if (that.options.order) {
        that.options.order.forEach((v) => {
          v[0] += startCol
        })
      } else {
        that.options.order = [[startCol, 'asc']]
      }
    }
  },
  mounted() {
    const that   = this
    const jq     = that.jq
    const $el    = jq(that.$refs.table)
    let cols     = that.options.columns
    for (let k in cols) {
      const col = cols[k]
      if (col.template || that.$scopedSlots[col.name]) {
        col.render = that.compileTemplate(col, that.$scopedSlots[col.name])
      }
      if (col.render) {
        if (!col.render.templated) {
          let myRender = col.render
          col.render = function() {
            return myRender.apply(that, Array.prototype.slice.call(arguments))
          }
        }
      }
      if (col.template) {
        delete col.template
      }
    }
    // handle local data loader
    if (that.dataLoader) {
      delete that.options.ajax
      that.options.serverSide = false
    }
    if (!that.hideFooter && that.columnSearch) {
      that.options.initComplete = function () {
        let api = this.api()
        let state = api.state.loaded()
        api.columns().every(function () {
          const that = this
          const colIdx = this.index()
          if(state){
            let colSearch = state.columns[colIdx].search
            if (colSearch.search){
              jq('input', this.footer()).val(colSearch.search)
            }
          }
          jq('input', this.footer()).on('keyup change clear search', function () {
            if (that.search() !== this.value) {
              that.search(this.value).draw()
            }
          })
        })
      }
    }
    // you can access and update the that.options and $el here before we create the DataTable
    that.$emit('table-creating', that, $el)
    that.dataTable = $el.DataTable(that.options)
    if (that.selectCheckbox) {
      // handle select all checkbox
      $el.on('click', 'th input.select-all-checkbox', (e) => {
        if(jq(e.target).is(':checked')) {
          that.dataTable.rows().select()
        } else {
          that.dataTable.rows().deselect()
        }
      })
      // handle individual row select events
      that.dataTable.on('select deselect', (e, dt, type, indexes) => {
        const $input = $el.find('th input.select-all-checkbox')
        if (that.dataTable.rows({
          selected: true
        }).count() !== that.dataTable.rows().count()) {
          jq('th.select-checkbox').removeClass('selected')
          $input.attr('checked', false)
        } else {
          jq('th.select-checkbox').addClass('selected')
          $input.attr('checked', true)
        }
        // type is select/deselect so event become row-select or row-deselect
        that.$emit('row-' + e.type, {
          dataTable: that.dataTable,
          e: e,
          dt: dt,
          type: type,
          indexes: indexes
        })
        // to get data, see const examples below
        // const rows = event.dataTable.rows( event.indexes )
        // const data = rows.data()
      })
    }
    // wire up edit, delete, and/or action buttons
    $el.on('click', '[data-action]', (e) => {
      e.preventDefault()
      e.stopPropagation()
      let target = jq(e.target)
      let action = target.attr('data-action')
      // no action, simply exit
      if (!action) {
        return
      } else {
        let tr = target
        // detect if action is inside a row
        // get data from parent row/tr
        if (target.prop('tagName') !== 'TR') {
          tr = target.closest('tr')
        }
        if (tr) {
          // if child row, get previous/parent row
          if (tr.hasClass('master-details')) {
            tr = tr.prev()
          }
          const row  = that.dataTable.row(tr)
          const data = row.data()
          that.$emit(action, data, row, tr, target)
        } else {
          // not a row click, must be other kind of action
          // such as bulk, csv, pdf, etc...
          that.$emit(action, null, null, null, target)
        }
      }
    })
    // handle master/details
    if (that.details) {
      // default to render function
      let renderFunc = that.details.render
      // must be string template
      if (that.details.template || that.$scopedSlots['_details']) {
        renderFunc = that.compileTemplate(that.details, that.$scopedSlots['_details'])
      } else if (renderFunc) {
        renderFunc = function() {
          return that.details.render.apply(that, Array.prototype.slice.call(arguments))
        }
      }
      // handle master/details
      // Add event listener for opening and closing details
      $el.on('click', 'td.details-control', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const target = jq(e.target)
        let tr       = target.closest('tr')
        if (tr.hasClass('master-details')) {
          tr = tr.prev()
        }
        const row = that.dataTable.row( tr )
        if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide()
          tr.removeClass('master')
        } else {
          // Open this row
          const data = row.data()
          row.child( renderFunc(data, 'child', row, tr) ).show()
          tr.addClass('master').next().addClass('master-details')
        }
      })
    }
    that.$emit('table-created', that)
    // finally, load data
    if (that.dataLoader) {
      that.reload()
    }
  },
  beforeDestroy() {
    const that = this
    if (that.dataTable) {
      that.dataTable.destroy(true)
    }
    that.dataTable = null
  },
  methods: {
    /**
     * Vue.compile a template string and return the compiled function
     *
     * @param  {Object} object with template property
     * @param  {Object} the slot
     * @return {Function}          the compiled template function
     */
    compileTemplate(field, slot) {
      const that = this
      const jq   = that.jq
      const vue  = that.myVue
      const res  = vue.compile(`<div>${field.template || ''}</div>`)
      const renderFunc = (data, type, row, meta) => {
        let myRender = res.render
        if (slot) {
          myRender = (createElement) => {
            return createElement('div', [
              slot({
                data: data,
                type: type,
                row: row,
                meta: meta,
                vdtnet: that,
                def: field,
                comp: that.$parent
              })
            ])
          }
        }
        const comp = new vue({
          data: {
            data: data,
            type: type,
            row: row,
            meta: meta,
            vdtnet: that,
            def: field,
            comp: that.$parent
          },
          render: myRender,
          staticRenderFns: res.staticRenderFns
        }).$mount()
        return jq(comp.$el).html()
      }
      renderFunc.templated = true
      return renderFunc
    },
    /**
     * Set table data array that was loaded from somewhere else
     * This method allow for local setting of data; though, it
     * is recommended to use ajax instead of this.
     *
     * @param {Array} data   the array of data
     * @return {Object}            the component
     */
    setTableData(data) {
      const that = this
      if (data.constructor === Array) {
        that.dataTable.clear().rows.add(data)
        that.dataTable.draw(false)
        that.dataTable.columns.adjust()
      }
      return that
    },
    /**
     * pass through reload method
     *
     * @param  {Boolean}  resetPaging true to reset current page position
     * @return {Object}            the component
     */
    reload(resetPaging = false) {
      const that = this
      if (that.dataLoader) {
        // manual data loading
        that.dataLoader((data) => {
          if (data && !data.data) {
            data = { data: data }
          }
          that.setTableData( data.data )
          that.$emit('reloaded', data, that)
        })
      } else {
        that.dataTable.ajax.reload( (data) => { that.$emit('reloaded', data, that) } , resetPaging )
      }
      return that
    },
    search(value) {
      const that = this
      that.dataTable.search( value ).draw()
      return that
    },
    setPageLength(value) {
      const that = this
      that.dataTable.page.len( value )
      return that.reload()
    },
    getServerParams() {
      if (this.dataLoader) {
        return {}
      }
      return this.dataTable.ajax.params()
    }
  }
}
</script>
<style>
.select-checkbox, .select-all-checkbox {
  cursor: pointer;
}
.vdtnet-footer .dataTables_length {
  padding-top: 6px;
  padding-right: 10px;
}
.vdtnet-footer .dataTables_length, .vdtnet-footer .dataTables_paginate {
  float: right;
}
.hide-footer .vdtnet-footer {
  display: none;
}
.master .details-plus
{
  cursor: pointer;
  display: none;
}
.details-minus
{
  cursor: pointer;
  display: none;
}
.master .details-minus
{
  cursor: pointer;
  display: inline;
}
.details-control {
  cursor: pointer;
  font-weight: 700;
}
</style>