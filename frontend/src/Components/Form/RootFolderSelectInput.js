import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FileBrowserModal from 'Components/FileBrowser/FileBrowserModal';
import EnhancedSelectInput from './EnhancedSelectInput';
import RootFolderSelectInputOption from './RootFolderSelectInputOption';
import RootFolderSelectInputSelectedValue from './RootFolderSelectInputSelectedValue';

class RootFolderSelectInput extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isAddNewRootFolderModalOpen: false,
      newRootFolderPath: ''
    };
  }

  componentDidUpdate(prevProps) {
    const {
      name,
      values,
      isSaving,
      saveError,
      onChange
    } = this.props;

    if (
      prevProps.isSaving &&
      !isSaving &&
      !saveError &&
      values.length - prevProps.values.length === 1
    ) {
      const newRootFolderPath = this.state.newRootFolderPath;

      onChange({ name, value: newRootFolderPath });
      this.setState({ newRootFolderPath: '' });
    }
  }

  //
  // Listeners

  onChange = ({ name, value }) => {
    if (value === 'addNew') {
      this.setState({ isAddNewRootFolderModalOpen: true });
    } else {
      this.props.onChange({ name, value });
    }
  }

  onNewRootFolderSelect = ({ value }) => {
    this.setState({ newRootFolderPath: value }, () => {
      this.props.onNewRootFolderSelect(value);
    });
  }

  onAddRootFolderModalClose = () => {
    this.setState({ isAddNewRootFolderModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      includeNoChange,
      onNewRootFolderSelect,
      ...otherProps
    } = this.props;

    return (
      <div>
        <EnhancedSelectInput
          {...otherProps}
          selectedValueComponent={RootFolderSelectInputSelectedValue}
          optionComponent={RootFolderSelectInputOption}
          onChange={this.onChange}
        />

        <FileBrowserModal
          isOpen={this.state.isAddNewRootFolderModalOpen}
          name="rootFolderPath"
          value=""
          onChange={this.onNewRootFolderSelect}
          onModalClose={this.onAddRootFolderModalClose}
        />
      </div>
    );
  }
}

RootFolderSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onNewRootFolderSelect: PropTypes.func.isRequired
};

export default RootFolderSelectInput;
