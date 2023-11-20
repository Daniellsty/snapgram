import  {useCallback, useState} from 'react'
import { FileWithPath, useDropzone} from 'react-dropzone'
import fileUploader from '../../../assets/icons/file-upload.svg'
import { Button } from '../button'

type FileUploaderProps={
  fieldChange:(FILES :File[]) => void;
  mediaUrl :string,
}

const FileUploader = ({fieldChange,mediaUrl}:FileUploaderProps) => {

    const [fileUrl,setFilteUrl] = useState(mediaUrl)
    const [file,setFile] = useState<File[]>([])
    
    const onDrop = useCallback(
      (acceptedFiles:FileWithPath[]) => {
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      setFilteUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])

    const {getRootProps, getInputProps} = useDropzone({
      
      onDrop,
      accept:{
        'image/*':['.png','.jpeg','.jpg','.svg']
      }
    
    })

  return (
    <div {...getRootProps() }  
    className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'
    >
      <input {...getInputProps()}
      className='cursor-pointer'
      />
      {
        fileUrl ? (
          <>
          <div className='flex flex-1 w-full p-5 
          lg:p-10 
          '>
            <img src={fileUrl} alt='image' className="file_uploader-img" />
          </div>
            <p className='file_uploader-label'>Click or drag photo to replace</p>
          </>

        ):(
                <div className='file_uploader-box'>
                  <img 
                  width={96}
                  height={77}
                  src={fileUploader} alt="file uploader" />
                  <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
                  <p className='text-light-4 small-regular mb-6'>SVG , PNG , JPG</p>

                  <Button className='shad-button_dark_4'>
                    Select From Device
                  </Button>
                </div>
        )

      }
    </div>
  )
}

export default FileUploader