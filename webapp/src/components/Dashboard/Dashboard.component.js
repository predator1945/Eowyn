import React, { Fragment, Component } from "react";
import { connect } from 'react-redux';
import './dashboard.css'

import { updateLayout, updateSettings, getLayout, getSettings } from './../../actions/Dashboard.actions'
import AddWidgetModal from './Modals/AddModal.component'
import EditWidgetModal from './EditModal.component'
import Loading from './Fragments/Loading.component'
import Navbar from '../Navbar.component';
import ActionButtons from './Fragments/ActionButtons.component'

import DashboardTabNav from './DashboardTabNav.component'
import DashboardTabBody from './DashboardTabBody.component'

class Dashboard extends Component {

  componentWillMount() {
    this.setState({
      isAddMode: false,
      isEditMode: false,
      isEditModalOpen: false,
      editedWidget: null
    })
    setTimeout(() => {
      this.setState({ tabActive: window.location.href.split('/')[4] || Object.keys(this.props.layout)[0] })
    }, 100)

    this.props.getLayout()
    this.props.getSettings()
  }

  onDelete(id) {
    let { layout, settings } = this.props
    const { tabActive } = this.state
    layout[tabActive].layout = layout[tabActive].layout.filter(el => el.i != id)
    settings[id] = null;
    this.props.updateSettings(settings)
    this.props.updateLayout(layout)
    this.props.getLayout()
    this.props.getSettings()
  }

  render() {
    if (!this.state.tabActive) return <Loading />

    let { layout: dashboard, settings } = this.props

    return (
      <Fragment>
                        
      {}
        <DashboardTabNav />
        {this.props.isAddModal ?
          <AddWidgetModal
            
            onClose={() => this.setState({ isAddMode: false })}
            layout={dashboard}
            tabActive={this.state.tabActive}
            settings={settings}
            update={(layout, settings) => {
              this.props.updateSettings(settings)
              dashboard[this.state.tabActive].layout = layout
              setTimeout(() => this.props.updateLayout(dashboard), 50)
              this.setState({ isAddMode: false })
            }} /> : ''}
        <DashboardTabBody />
        

        {this.props.isEditModal ?
          <EditWidgetModal
            onClose={() => this.setState({ isEditModalOpen: false })}
            editedWidget={this.state.editedWidget}
            editWidget={(type, id, settings_) => {
              settings[id].settings = settings_;
              this.props.updateSettings(settings)
              this.setState({ isEditModalOpen: false })
            }}
          /> : ''}

        <ActionButtons
          isEditMode={this.state.isEditMode}
          updateState={(isAddMode, isEditMode) => this.setState({ isAddMode, isEditMode })}
        />

      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.dashboard)
  return {
    ...state.dashboard,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLayout: (layout, no) => dispatch(updateLayout(layout, no)),
    updateSettings: (settings, no) => dispatch(updateSettings(settings, no)),
    getLayout: () => dispatch(getLayout()),
    getSettings: () => dispatch(getSettings()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

