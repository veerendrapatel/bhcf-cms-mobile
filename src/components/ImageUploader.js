
import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
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

        let source = selectedImageTmp ? selectedImageTmp : selectedImage;
        
        source = source === null ? require('../../assets/default.png') : { uri: source};

        return (
            <View>
            {selectedImage ?
                (
                    <Avatar rounded size="xlarge" source={{ uri:  selectedImage  }} iconStyle={{ fontSize: 15 }} showEditButton={true} onEditPress={() => this.setState({ isVisible: true })}/>
                ) : (
                    <Avatar rounded size="xlarge" icon={{name: 'user', type: 'font-awesome'}} iconStyle={{ fontSize: 15 }} showEditButton={true} onEditPress={() => this.setState({ isVisible: true })}/>
                
                )
                
            }
            <Overlay
                isVisible={isVisible}
                onBackdropPress={() => this.setState({ isVisible: false })}
                >
                <View style={{...styles.container, alignItems: 'center'}}>
                 <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 50}}
                    />
                    <ImageBackground source={source} style={{overflow: 'hidden', width: '100%', height: 250, marginTop: 20}}>
                        <View style={ styles.iconContainer }>
                            <Icon name="ios-camera" color={'#FFF'} containerStyle={styles.icon} size={25} type="ionicon" onPress={this._takePhoto}/>
                            <Icon name="ios-image" color={'#FFF'} containerStyle={styles.icon} size={25} type="ionicon" onPress={this._pickImage}/>
                        </View>
                    </ImageBackground>
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
        
    },
    avatar: {
        width: 300,
        height: 300
    },
    iconContainer: {
        ...container,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        position:'absolute',
        bottom:0,
        backgroundColor: 'rgba(0, 0, 0, 0.611764705882353)'
    },
    icon: {
        margin: 5
    }
});
export default ImageUploader;