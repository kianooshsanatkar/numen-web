import {
  Container,
  Grid,
  Hidden,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NoImage from "../../resource/images/no-image-available.jpg";

import HeightSpace from "../../components/space/space.component";
import "./product.style.css";

class ProductPage extends Component {
  state = {
    product: null,
    images: [],
    selectedImage: NoImage,
  };
  componentDidMount() {
    let productId = this.props.match.params.productId;
    fetch("http://127.0.0.1:5000/api/product/" + productId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.images ? data.images.split(",") : [NoImage]);
        this.setState({
          product: data,
          images: data.images.split(","),
          selectedImage: data.images.split(",")[0],
        });
      });
  }

  getImagePath(fileName, size = "small") {
    if (fileName === null || fileName === undefined || fileName === "")
      return NoImage;
    let link_path = "http://127.0.0.1:5000/static/images/";
    return link_path + fileName + "_" + size + ".jpg";
  }

  setTBody(properties) {
    const rows = [];
    for (let [key, val] of Object.entries(properties)) {
      rows.push(
        <TableRow key={key}>
          <TableCell align="right"><strong>{key}:</strong></TableCell>
          <TableCell align="right">{val}</TableCell>
        </TableRow>
      );
    }
    return rows;
  }

  render() {
    console.log("***************************");
    console.log(this.state.product);
    return (
      <main>
        <HeightSpace></HeightSpace>
        {!this.state.product ? null : (
          <Container fixed>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12} className="product-images-container">
                <Hidden smUp>
                  <Grid item xs={12}>
                    <h1>{this.state.product.title}</h1>
                  </Grid>
                </Hidden>
                <Grid item xs={12}>
                  <img
                    className="product-images"
                    src={this.getImagePath(this.state.selectedImage, "large")}
                    alt={this.state.product.title}
                  ></img>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  {this.state.images.map((image) => (
                    <Grid key={image} item xs={4} md={3}>
                      <img
                        className="product-images"
                        onClick={()=>(this.setState({selectedImage:image}))}
                        src={this.getImagePath(image)}
                        alt={this.state.product.title}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Hidden xsDown>
                  <h1>{this.state.product.title}</h1>
                </Hidden>
                <HeightSpace Height="10vh" />
                <p className="product-description">
                  {this.state.product.description}
                </p>
              </Grid>
              <Grid item sm={6} xs={12}>
                {!this.state.product.properties ? null : (
                  <TableContainer
                    component={Paper}
                    style={{ direction: "rtl" }}
                  >
                    <Table
                      className="product-properties"
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">
                            <h3>مشخصات</h3>
                          </TableCell>
                          <TableCell align="right">
                            <h3>مقدار</h3>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.setTBody(this.state.product.properties)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  fullWidth
                  style={{ top: "50%", marginTop: "-1em" }}
                >
                  خرید
                </Button>
              </Grid>
            </Grid>
          </Container>
        )}
      </main>
    );
  }
}

export default withRouter(ProductPage);
