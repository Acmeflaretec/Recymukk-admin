import { Alert, Box, Button, Grid, ToggleButton, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import PageLayout from 'layouts/PageLayout';
import toast from "react-hot-toast";
import Input from "components/Input";
import { useEditNotification } from "queries/StoreQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useGetNotificationById } from "queries/StoreQuery";
import { useDeleteNotification } from "queries/StoreQuery";
// import TextEditor from "./TextEditor";

const EditNotification = () => {
   const { id } = useParams();
   const navigate = useNavigate()
   const { data: res, isLoading } = useGetNotificationById({ id });
   useEffect(() => {
      setData(res?.data)
   }, [res])
   const [data, setData] = useState({})
   const fileInputRef = React.useRef(null);

   const handleChange = (e) => {
      setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };
   const { mutateAsync: editNotification, isLoading: updating } = useEditNotification()
   const { mutateAsync: deleteBlog, isLoading: deleting } = useDeleteNotification()

   const handleDelete = () => {
      deleteBlog(data)
         .then((res) => {
            if (res) {
               toast.success(res?.message ?? "Blog deleted Successfully");
               navigate('/notification')
            }
         })
         .catch((err) => {
            toast.error(err?.message ?? "Something went wrong");
         });
   };
   const handleSubmit = () => {
      try {

         if (!data?.notification) {
            return toast.error("description is required")
         }

         editNotification(data)
            .then((res) => {
               if (res) {
                  toast.success(res?.message ?? "Blog updated Successfully");
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
         title={'Edit Notification'}
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
                  <Button onClick={handleSubmit} disabled={updating}>Update Notification</Button>
                  <Button color="secondary" onClick={handleDelete} disabled={deleting}>Delete Notification</Button>
               </Grid>
            </Grid>
         </Box>

      </PageLayout>
   )
}

export default EditNotification