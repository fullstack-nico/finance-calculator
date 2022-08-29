// (─‿‿─)  Reacts
import React, {Component} from 'react';
import {Image as Images} from 'react-native';

//  base styles  و٩(๑˃̵ᴗ˂̵)و
import {theme} from '../../_config/global';

export class ImageComponent extends Component {
    render() {
        return (
            <Images
                resizeMode={'contain'}
                style={[theme.IMAGE, this.props.style]}
                source={this.props.source || require('../../_resources/Images/MAIN_default_thumbnail.png')}
            />
        );
    }
}


