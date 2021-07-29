package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.content.Context;

import org.opencv.core.CvType;
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.android.Utils;
import org.opencv.imgproc.Imgproc;

import android.util.Base64;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.io.ByteArrayOutputStream;

public class RNOpenCvLibraryModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNOpenCvLibraryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNOpenCvLibrary";
    }

    @ReactMethod
    public void getGrayImage(String imageAsBase64, Callback errorCallback, Callback successCallback) {
        try {
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inDither = true;
            options.inPreferredConfig = Bitmap.Config.ARGB_8888;

            //TAKING BASE64 IMAGE AND TURN IT INTO BYTE ARRAY, THEN CONVERT TO BITMAP
            byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
            Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

            //GRAYSCALE IMAGE
            Mat matImage = new Mat();
            Utils.bitmapToMat(image, matImage);
            Mat matImageGray = new Mat();
            Imgproc.cvtColor(matImage, matImageGray, Imgproc.COLOR_BGR2GRAY);

            //BLUR IMAGE
            Mat matImageBlur = new Mat(matImageGray.rows(), matImageGray.cols(), matImageGray.type());
            Imgproc.medianBlur(matImageGray, matImageBlur, 7);
            //9

            //TRESHOLD
            Mat matImageTres = new Mat(matImageBlur.rows(), matImageBlur.cols(), matImageBlur.type());
            Imgproc.adaptiveThreshold(matImageBlur, matImageTres, 255, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV, 11, 5);

            // Mat matImageDilate = new Mat();
            // Mat kernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(9,9));
            // Imgproc.dilate(matImageTres, matImageDilate, kernel, new Point(-1, -1), 3);

            // List<MatOfPoint> contours = new ArrayList<>();
            // Mat hierarchy = new Mat();
            // Imgproc.findContours(matImageDilate, contours, hierarchy, Imgproc.RETR_TREE, Imgproc.CHAIN_APPROX_SIMPLE);

            // Scalar color = new Scalar(0, 225, 0);
            // Imgproc.drawContours(matImage, contours, -1, color, 3, Imgproc.LINE_8, hierarchy, 2, new Point());


            //ERODING AND DILATING
            // Mat matImageErode = new Mat(matImageTres.rows(), matImageTres.cols(), matImageTres.type());
            // Mat element = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new  Size(2*1 + 1, 2*1+1));
            // Imgproc.erode(matImageTres, matImageErode, element);

            // Mat matImageDilate = new Mat(matImageErode.rows(), matImageErode.cols(), matImageErode.type());
            // Mat element1 = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new  Size(2*1 + 1, 2*1+1));
            // Imgproc.dilate(matImageErode, matImageDilate, element1);
            

            //CONVERT BACK TO BITMAP > BYTE ARRAY > BASE64 IMAGE
            Bitmap bmpImageFinal = Bitmap.createBitmap(matImageTres.cols(),matImageTres.rows(), Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(matImageTres, bmpImageFinal);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            bmpImageFinal.compress(Bitmap.CompressFormat.JPEG, 100, outputStream);
            byte[] byteArray = outputStream.toByteArray();

            String encoded = Base64.encodeToString(byteArray, Base64.DEFAULT);

            successCallback.invoke(encoded);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

   

            //CANNY
            // Mat matImageCanny = new Mat();
            // Imgproc.Canny(matImageGray, matImageCanny, 100, 100*3);

            //FIND AND DRAW CONTOURS
            // List<MatOfPoint> contours = new ArrayList<>();
            // Mat matHierarchy = new Mat();
            // Imgproc.findContours(matImageTres, contours, matHierarchy, Imgproc.RETR_TREE, Imgproc.CHAIN_APPROX_NONE);

            // Mat matDrawing = Mat.zeros(matImageTres.size(), CvType.CV_8UC3);
            // Scalar color = new Scalar(0, 255, 0);
            // Imgproc.drawContours(matDrawing, contours, -1, color, 2, Imgproc.LINE_8, matHierarchy, 0, new Point());




            //BACKUP
            // Mat matImageBlur = new Mat(matImageGray.rows(), matImageGray.cols(), matImageGray.type());
            // Imgproc.medianBlur(matImageGray, matImageBlur, 7);
            // //9

            // //TRESHOLD
            // Mat matImageTres = new Mat(matImageBlur.rows(), matImageBlur.cols(), matImageBlur.type());
            // Imgproc.adaptiveThreshold(matImageBlur, matImageTres, 255, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY_INV, 7, 2);

            // Mat matImageDilate = new Mat();
            // Mat kernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(9,9));
            // Imgproc.dilate(matImageTres, matImageDilate, kernel, new Point(-1, -1), 3);

            // List<MatOfPoint> contours = new ArrayList<>();
            // Mat hierarchy = new Mat();
            // Imgproc.findContours(matImageDilate, contours, hierarchy, Imgproc.RETR_TREE, Imgproc.CHAIN_APPROX_SIMPLE);

            // Scalar color = new Scalar(0, 225, 0);
            // Imgproc.drawContours(matImage, contours, -1, color, 3, Imgproc.LINE_8, hierarchy, 2, new Point());
}