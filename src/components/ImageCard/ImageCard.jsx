import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageCard.css'; 
//import MaterialUI stuff
//import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';




class ImageCard extends Component {

    componentDidMount(){
        console.log(`This image: ${this.props.imageID} has a link of ${this.props.link}`);
        console.log(`${this.props.imageID} image has a category of: ${this.props.category}`);
        console.log("is category falsey?", (this.props.category) ? 'truthy' : 'falsey');
    }
    setCategory = (event) => {
        // console.log('from the select', event.target.value);
        // console.log('from image card id:', this.props.imageID);
        this.props.dispatch({type: 'SET_NEW_CAT', payload: {category: event.target.value, id: this.props.imageID}})
    }

    conditionalButton = () => {
        return (
            (this.props.isOnSearch) ? 
                <Button className="faveBtn" variant="contained" color="secondary" size="small" onClick={this.handleFavClick}>
                    Favorite This Gif
                 </Button> :
                 <div>
                     <p>Category:</p>
                    <select onChange={(e) => this.setCategory(e)}>
                        {this.props.reduxState.categoryReducer.data.map((cat, i) => {
                            return(
                                (this.props.category && (i+1) === this.props.category) ? 
                                    <option value={i + 1} label={cat.category_name} selected/> :
                                    <option value={i + 1} label={cat.category_name}  />
                            )
                        })}
                    </select>
                 </div>
        )
    }
    handleFavClick = (event) => {
        console.log('in handleFavClick')
        console.log("!!!11!@212121212 we here:", this.props.link)
        //NEED TO ADD PAYLOAD TO THE DISPATCH
        this.props.dispatch({type: 'SET_NEW_FAV', payload: {link: this.props.link}})
    };


    render() {
        console.log('this.props.reduxState.getCategories:', this.props.reduxState.categoryReducer);
        return (
            <div>
            <Card className="gifCard">
                <CardActionArea>
                    <CardMedia className="gifImage">
                        <img src={this.props.link} alt="Heres your gif"/>
                        {/* // image="../Images/computing.gif" */}
                        {/* // title="gif goes here" */}
                    </CardMedia>
                    {/* <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Test Text Here
                        </Typography>
                    </CardContent> */}
                    {/* <CardActions>
                        <Button className="faveBtn" variant="contained" color="secondary" size="small" onClick={this.handleFavClick}>
                            Favorite This Gif
                        </Button>
                    </CardActions> */}
                </CardActionArea>
            </Card>
           
                    {this.conditionalButton()}
                 {/* <Button className="faveBtn" variant="contained" color="secondary" size="small" onClick={this.handleFavClick}>
                            Favorite This Gif
                 </Button> */}
            </div>
        );
    }

}


const mapStateToProps = reduxState => ({
    reduxState
})

export default connect(mapStateToProps)(ImageCard);