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

const ProductCreateForm = ({ handleSubmit, handleChange, values, handleCategoryChange, subOptions, showSub, setValues, choiceOptions }) => {

    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        pickup,
        quantity,
        images,
        ingredients,
        choices

    } = values;

    const classes = useStyles();    

    return (
<>
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
              value={choices}
              onChange={(value) => setValues({ ...values, choices: value })}
            >
              {choiceOptions.map((c) => (
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
            name="pickup"
            className="form-control"
            onChange={handleChange}
            style={{fontFamily: 'Nunito',
            color: '#fca311',}}
            >
            <option className={classes.option}>Please select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            </select>
      </Box>


      <Box className={classes.inputContainer}>
        <label className={classes.label}>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          style={{fontFamily: 'Nunito',
          color: '#fca311',}}
        >
          <option className={classes.option}>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </Box>

      {showSub && (
        <div className={classes.inputContainer}>
          <label className={classes.label}>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" , fontFamily: 'Nunito',
            color: '#fca311'}}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )} 

      <br />
      <Button variant='outlined' color='secondary' onClick={handleSubmit} className={classes.btn}>Save</Button>
    </form>
    </>
    )
  
}

export default ProductCreateForm;