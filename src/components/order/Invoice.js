import React, {useEffect, useState} from "react";
import { Document, Page, Text, StyleSheet, Font, View  } from "@react-pdf/renderer";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell,
} from "@david.kucsai/react-pdf-table";



const styles = StyleSheet.create({
    body: {
       padding: 30

    },
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
      },
      line: {
         borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        borderBottomStyle: 'solid', 
        marginTop: 10,
        marginBottom: 10,
        
      },
       rightColumn: {
        flexDirection: 'column',
        flexGrow: 2,
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
      },
      logo: {
        fontSize: 20,
        color: '#0c2f54',
      },
      date: {
        fontSize: 12,
        color: '#697a8c'
      },
      summary: {
          marginTop: 20,
          marginBottom: 10
      },

      orderNumber: {
        fontSize: 12,
        color: '#697a8c',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
      },
      left: {
        fontSize: 12,
        color: '#697a8c',
        alignSelf: 'flex-start',
        justifySelf: 'flex-start',
      },

      total:{
         fontSize: 12,
        color: '#697a8c',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
        backgroundColor: '#e5e5e5',
        
      },
        right: {
        fontSize: 20,
        color: '#0c2f54',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
      },

});

const Invoice = ({ order, user, allusers }) => {  

const getTotal = () => {
    let total = 0;
    if(order.products.extraCharge) {

        for(let i = 0; i<order.products.length; i++) {

            total = order.products[i].product.price * order.products[i].count + total
        }

    } else {
        for(let i = 0; i<order.products.length; i++) {

            total = (order.products[i].product.price + order.products[i].extraCharge) * order.products[i].count + total
        }
    }
        return total
}

//console.log(order)


    return (
    <Document>
        <Page size="A4" style={styles.body}>
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <Text style={styles.logo}>KeenokThai</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.right}>Receipt</Text>
                </View>
            </View>
            <View style={styles.line}></View>
          
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                <Text style={styles.date}>Order Date:  {new Date(order.createdAt).toLocaleString()}</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.orderNumber}>Order#{order._id}</Text>
                </View>
            </View>
            <View style={styles.line}></View>
          
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                        {allusers ? allusers.filter((u) => u._id === order.orderedBy).map(u =>  <Text style={styles.date} key={u._id}>Customer Name: {u.name}</Text>) : <Text style={styles.date}>Customer: {order.orderedBy.name}</Text>}

                        {allusers ? allusers.filter((u) => u._id === order.orderedBy).map(u =>  <Text style={styles.date} key={u._id}>Customer Email: {u.email}</Text>) : <Text style={styles.date}>Customer Email: {order.orderedBy.email}</Text>}

                </View>
             
                <View style={styles.rightColumn}>
                     <Text style={styles.orderNumber}>Payment Method: {order.paymentIntent.status === 'succeeded' ? 'Card' : order.paymentIntent.status === 'Cash Payment'? 'Cash': 'Venmo' }</Text>
                    
                     {allusers ? allusers.filter((u) => u._id === order.orderedBy).map(u =>  <Text style={styles.orderNumber} key={u._id}>Pickup Date &amp; Time: {new Date(u.address).toLocaleString()}</Text>) : <Text style={styles.orderNumber}>Pickup Date &amp; Time: {new Date(order.orderedBy.address).toLocaleString()}</Text>}
                </View>
            </View>

            <View style={styles.summary}>
                <Text style={styles.date}>Order Summary</Text>
           </View>

            <Table >
                <TableHeader textAlign={'center'} style={{border: 'none'}}>
                    <TableCell><Text style={{ color: '#697a8c', margin: '1rem'}}>Product</Text></TableCell>
                    <TableCell><Text style={{ color: '#697a8c', margin: '1rem'}}>Instructions</Text></TableCell>
                    <TableCell><Text style={{ color: '#697a8c', margin: '1rem'}}>Price</Text></TableCell>
                    <TableCell><Text style={{ color: '#697a8c', margin: '1rem'}}>Quantity</Text></TableCell>
                      <TableCell><Text style={{ color: '#697a8c', margin: '1rem'}}>Amount</Text></TableCell>
                </TableHeader>
            </Table>

            <Table data={order.products}>
                <TableBody textAlign={'center'}>
                    <DataTableCell getContent={(x) => <Text style={{ color: '#697a8c', fontSize: 12, padding: '1rem'}}>{x.product.title}</Text>} />
                    <DataTableCell getContent={(x) => <Text style={{ color: '#697a8c', fontSize: 12, padding: '1rem'}}>{x.typeOfChoice ? x.typeOfChoice: ''} ${x.extraCharge ? x.extraCharge :0} {x.instructions ? x.instructions : ''}</Text>} />
                    <DataTableCell getContent={(x) => <Text style={{ color: '#697a8c', fontSize: 12, padding: '1rem'}}>{`$${(x.product.price + x.extraCharge).toFixed(2)}`}</Text>} />
                    <DataTableCell getContent={(x) => <Text style={{ color: '#697a8c', fontSize: 12, padding: '1rem'}}>{x.count}</Text>} />
                    <DataTableCell getContent={(x) => <Text style={{ color: '#697a8c', fontSize: 12, padding: '1rem'}}>${x.extraCharge ? (x.count * (x.product.price + x.extraCharge)).toFixed(2) : ((x.count * x.product.price).toFixed(2))}</Text>} />
                </TableBody>
            
            </Table>

            <View style={{marginBottom: 20}}></View>
          
           <View style={styles.rightColumn}>
                <Text style={styles.total}>Sub Total: ${(getTotal()).toFixed(2)}</Text>
                <Text style={styles.total}>Card Fee: ${(((order.paymentIntent.amount)/100) - getTotal()).toFixed(2)}</Text>
                <Text style={styles.total}>Total: ${((order.paymentIntent.amount)/100).toFixed(2)}</Text>
               
            </View> 

            <View style={{textAlign: 'center'}}>
                <Text style={{fontSize: 15,  color: '#697a8c'}}>Thank you for your support! :)</Text>
            </View> 
       
         

        </Page>
    </Document>
    )
};




export default Invoice;
