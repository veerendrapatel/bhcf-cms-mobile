
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Icon, Overlay, ButtonGroup  } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import { dimensions, colors, padding, fonts, container } from '../styles/base';
class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            selectedIndex: null,
            selectedImage: this.props.source,
            selectedImageTmp: this.props.source,
            selectedImageForUpload: null
        };

        this.updateIndex = this.updateIndex.bind(this);
        this._takePhoto = this._takePhoto.bind(this);
        this._pickImage = this._pickImage.bind(this);
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.source != this.props.source) {
            this.setState({ selectedImage: nextProp.source });
        }
    }

    updateIndex (selectedIndex) {
        // this.setState({selectedIndex});
        switch(selectedIndex) {
            case 0: 
                this.setState({ isVisible: false });
                break;
            case 1: 
                this.props.onSelectedImage(this.state.selectedImageForUpload, this.state.selectedImageTmp);
                this.setState({ isVisible: false, selectedImage: this.state.selectedImageTmp });
                
                break;
        }
    }

     _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled && pickerResult) {

                 // ImagePicker saves the taken photo to disk and returns a local URI to it
                let localUri = `data:image/jpg;base64,${pickerResult.base64}`;
                this.setState({ selectedImageTmp: pickerResult.uri, selectedImageForUpload: localUri });
               
            }
        } catch (e) {
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };

    _pickImage = async() => {
        const permissions = Permissions.CAMERA_ROLL;
        const { status } = await Permissions.askAsync(permissions);
        if(status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64: true,
                // aspect: [4, 3],
            });

            
            this._handleImagePicked(result);
        }
        
    }


   

    _takePhoto = async () => {
        const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);

        const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                base64: true,
                // aspect: [4, 3],
            });

            this._handleImagePicked(pickerResult);
        }
    };

    render() {
        const buttons = ['Cancel', 'Save']
        const { selectedIndex, selectedImage, isVisible, selectedImageTmp } = this.state;

        return (
            <View>
            {selectedImage ?
                (
                    <Avatar rounded size="large" source={{ uri:  selectedImage  }} onPress={() => this.setState({ isVisible: true })}/>
                ) : (
                    <Avatar rounded size="large" icon={{name: 'user', type: 'font-awesome'}} onPress={() => this.setState({ isVisible: true })}/>
                
                )
                
            }
            <Overlay
                isVisible={isVisible}
                onBackdropPress={() => this.setState({ isVisible: false })}
                >
                <View style={styles.container}>
                 <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 50}}
                    />
                    <View>
                        {selectedImageTmp ?
                            <Avatar containerStyle={styles.avatar} size="xlarge" source={{uri: selectedImageTmp}}/>
                            :
                            <Avatar containerStyle={styles.avatar} size="xlarge" icon={{name: 'user', type: 'font-awesome'}}/>
                        }
                        <View style={ styles.iconContainer }>
                            <Icon name="ios-camera" containerStyle={styles.icon} size={30} type="ionicon" onPress={this._takePhoto}/>
                            <Icon name="ios-image" containerStyle={styles.icon} size={30} type="ionicon" onPress={this._pickImage}/>
                        </View>
                    </View>
                </View>
            </Overlay>
            </View>
            
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        ...container,
    },
    avatarContainer: {
        ...container,
        position:'relative',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 300,
        borderWidth:1,
        borderColor: '#000'
    },
    avatar: {
        width: 300,
        height: 300
    },
    iconContainer: {
        ...container,
        flexDirection: 'row',
        alignItems: 'center',
        position:'absolute',
        bottom:0
    },
    icon: {
        margin: padding.sm
    }
});
export default ImageUploader;