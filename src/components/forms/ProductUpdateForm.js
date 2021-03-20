import React from 'react'
import { Select } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Box, Button } from '@material-ui/core';


const { Option } = Select;

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        marginBottom: '2rem',
        
    },
    input: {
        fontFamily: 'Nunito',
        color: '#fca311',
        
    }, 
    btn: {
        color: '#fca311',
    

    },
    label: {
        fontFamily: 'Nunito',
        fontWeight: '.1rem'
    },
    option: {
         fontFamily: 'Nunito',
         color: '#fca311',
    
    }

}));

const ProductUpdateForm = ({ handleSubmit, handleChange, values, setValues, handleCategoryChange, categories, subOptions, arrayOfSubs, setArrayOfSubs, selectedCategory, choiceOptions, setArrayOfChoices, arrayOfChoices }) => {

    const {
        title,
        description,
        price,
        category,
        pickup,
        quantity,
        ingredients,
        choices
    } = values;

    const classes = useStyles();    
    return (
        <form onSubmit={handleSubmit}>
          <Box className={classes.inputContainer}>
               <TextField
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    InputProps={{
                        className: classes.input,
                    }}
                    label='Product Name'
                    fullWidth
                />
            </Box>

            <Box className={classes.inputContainer}>
                <TextField
                     type="text"
                     name="description"
                     label='Description'
                     value={description}
                     onChange={handleChange}
                     fullWidth
                     InputProps={{
                         className: classes.input,
                     }}
                    
                 />
            </Box>

            <Box className={classes.inputContainer}>
            <TextField
                     type="text"
                     name="ingredients"
                     label='Ingredients'
                     value={ingredients}
                     onChange={handleChange}
                     fullWidth
                     InputProps={{
                         className: classes.input,
                     }}
                    
                 />
            </Box>

            <div className={classes.inputContainer}>
            <label className={classes.label}>Extra Choice of Ingredient</label>
                    <Select
                        mode="multiple"
                        style={{ width: "100%" , fontFamily: 'Nunito',
                        color: '#fca311'}}
                        placeholder="Please select"
                        value={arrayOfChoices}
                        onChange={(value) => setArrayOfChoices(value)}
                    >
                        {choiceOptions.length &&
                            choiceOptions.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name} ${c.price}
                                </Option>
                            ))}
                    </Select>
            </div>

            <Box className={classes.inputContainer}>
                <TextField
                    type="number"
                     name="price"
                     value={price}
                     onChange={handleChange}
                     label='Price'
                 fullWidth
                     InputProps={{
                         className: classes.input,
                     }}
                 />
            </Box>

            <Box className={classes.inputContainer}>
             <TextField
                     type="number"
                     name="quantity"
                 value={quantity}
                     onChange={handleChange}
                     label='Quantity'
                     fullWidth
                     InputProps={{
                         className: classes.input,
                     }}
                 />
             </Box>


             <Box className={classes.inputContainer}>
            <label className={classes.label}>Pickup</label>
                <select
                    value={pickup === 'Yes' ? 'Yes' : 'No'}
                    name="pickup"
                    className="form-control"
                    onChange={handleChange}
                    style={{fontFamily: 'Nunito',
            color: '#fca311',}}
                >
                    <option value="No" className={classes.option}>No</option>
                    <option value="Yes" className={classes.option}>Yes</option>
                </select>
            </Box>

            <Box className={classes.inputContainer}>
        <label className={classes.label}>Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleCategoryChange}
                    value={selectedCategory ? selectedCategory : category._id}
                    style={{fontFamily: 'Nunito',
                    color: '#fca311',}}
                >

                    {categories.length > 0 &&
                        categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </Box>

            <div className={classes.inputContainer}>
          <label className={classes.label}>Sub Categories</label>
                <Select
                    mode="multiple"
                    style={{ width: "100%" , fontFamily: 'Nunito',
                    color: '#fca311'}}
                    placeholder="Please select"
                    value={arrayOfSubs}
                    onChange={(value) => setArrayOfSubs(value)}
                >
                    {subOptions.length &&
                        subOptions.map((s) => (
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>
                        ))}
                </Select>
            </div>

            <Button variant='outlined' color='secondary' onClick={handleSubmit} className={classes.btn}>Update</Button>
        </form>
    )
}

export default ProductUpdateForm;