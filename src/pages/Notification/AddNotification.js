import { Box, Button, Grid, ToggleButton, Typography } from "@mui/material";
import React, { useState } from 'react'
import PageLayout from 'layouts/PageLayout';
import toast from "react-hot-toast";
import { useAddNotifications } from "queries/StoreQuery";
import { useNavigate } from "react-router-dom";
// import TextEditor from "./TextEditor";
import Input from "components/Input";


const AddNotification = () => {
   const [data, setData] = useState({})
   const navigate = useNavigate()


   const handleChange = (e) => {
      setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };
   const { mutateAsync: addNotifications, isLoading } = useAddNotifications()

   const handleSubmit = () => {
      try {

         if (!data?.notification) {
            return toast.error("notification is required")
         }
         addNotifications(data)
            .then((res) => {
               if (res) {
                  toast.success(res?.message ?? "Notification added Successfully");
                  navigate('/notification')
               }
            })
            .catch((err) => {
               toast.error(err?.message ?? "Something went wrong");
            });

      } catch (error) {
         console.error(error)
      }
   }
   return (
      <PageLayout
         title={'Add Notification'}
      >
         <Box sx={{ flexGrow: 1 }} display={'flex'} justifyContent={'center'}>
            <Grid container spacing={2} maxWidth={600} py={5} px={1}>


               {/* <Grid item xs={12} mb={12}>
                  <TextEditor value={data?.notification || ''} onChange={handleChange} />
               </Grid> */}
               <Grid item xs={12}>
                  <Input
                     id="notification"
                     placeholder="Notification"
                     name="notification"
                     value={data?.notification || ''}
                     onChange={handleChange}
                     multiline
                     rows={5}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Typography variant="caption">
                     Notification status &nbsp;
                  </Typography>
                  <ToggleButton
                     value={data?.status}
                     selected={data?.status}
                     onChange={() => {
                        setData(prev => ({ ...prev, status: !data?.status }))
                     }}
                  >
                     {data?.status ? 'Active' : 'Blocked'}
                  </ToggleButton>
               </Grid>


               <Grid item xs={12}>
                  <Button onClick={handleSubmit} disabled={isLoading}>Add Notification</Button>
               </Grid>

            </Grid>
         </Box>

      </PageLayout>
   )
}

export default AddNotification