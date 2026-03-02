import React from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name too short')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const loading = toast.loading('Sending your message...');
      
      setTimeout(() => {
        toast.success('Message sent! Our team will get back to you.', { id: loading });
        resetForm();
      }, 1500);
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl grid md:grid-cols-2 bg-slate-900/50 rounded-[40px] border border-white/5 overflow-hidden shadow-2xl"
      >
        {/* Contact Info Side */}
        <div className="p-12 bg-blue-600 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Get in <br />Touch</h2>
            <p className="text-blue-100 font-medium">Have feedback on a feature? Or just want to talk cricket? We're listening.</p>
          </div>
          <div className="space-y-4 text-lg font-bold tracking-widest">
            <p>support@cricsocial.com</p>
            <p>Stadium Hub, Mumbai, IN</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-12">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  name="name"
                  placeholder="Full Name"
                  {...formik.getFieldProps('name')}
                  className={`w-full bg-slate-800/50 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all`}
                />
              </div>
              {formik.touched.name && formik.errors.name && <p className="text-red-500 text-[10px] font-black uppercase ml-4">{formik.errors.name}</p>}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  name="email"
                  placeholder="Email"
                  {...formik.getFieldProps('email')}
                  className={`w-full bg-slate-800/50 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all`}
                />
              </div>
              {formik.touched.email && formik.errors.email && <p className="text-red-500 text-[10px] font-black uppercase ml-4">{formik.errors.email}</p>}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-slate-500" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  {...formik.getFieldProps('message')}
                  className={`w-full bg-slate-800/50 border ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all resize-none`}
                />
              </div>
              {formik.touched.message && formik.errors.message && <p className="text-red-500 text-[10px] font-black uppercase ml-4">{formik.errors.message}</p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3 group"
            >
              SEND MESSAGE
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;