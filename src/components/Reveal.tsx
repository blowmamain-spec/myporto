//Use client untuk framer motion menjalankan animasi di browser
"use client";

//untuk menggunakan versi animasi dari tag HTML biasa, seperti div -> motion.div
import { motion } from "framer-motion";
//ReactNode adalah tipe typescript untuk "isi JSX apa pun" yang ada di dalam komponen
import type { ReactNode } from "react";

//Menentukan input (props) yang diterima komponen <Reveal>
type RevealProps = {
    children: ReactNode; // elemen apapun yang dibungkus di dalam <Reveal>
    delay?: number; //Tanda "?" artinya opsional, jeda (s) sebelum animasi mulai
    className?: string; //Class tailwind tambahan jika diperlukan
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
    return (
        <motion.div
            //kondisi awal sebelum elemen masuk ke layar, tidak terlihat dan geser 24x ke bawah//
            initial={{ opacity: 0, y: 24 }}
            
            //kondisi tujuan saat elemen terlihat waktu discroll, terlihat penuh dan posisi normal//
            whileInView={{ opacity: 1, y: 0}}

            //once: true, cukup animasi 1 kali saja (tidak hilang lagi saat scroll ke atas//
            //amount: 0.15 -> mulai bergerak ketika 15% bagian elemen sudah masuk layar //
            viewport={{ once: true, amount: 0.15 }}
            //durasi dan kurva gerakan halus (cubic-bezier khas transisi editorial modern) //
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1], }}
            className={className}>
             {children}   
        </motion.div>
    );
}