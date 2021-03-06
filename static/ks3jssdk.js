        
            var ks3FileUploader = function(ks3PostOptions, pluploadOptions){
                this.defaultKS3Options  = {
                    KSSAccessKeyId: "",
                    policy: "", //请求中用于描述获准行为的安全策略。没有安全策略的请求被认为是匿名请求，只能访问公共可写空间。
                    signature: "", //根据Access Key Secret和policy计算的签名信息，KS3验证该签名信息从而验证该Post请求的合法性。
                    bucket_name: "", //上传的空间名
                    key: "", //被上传键值的名称。如果用户想要使用文件名作为键值，可以使用${filename} 变量。例如：如果用户想要上传文件local.jpg，需要指明specify /user/betty/${filename}，那么键值就会为/user/betty/local.jpg。
                    acl: "public-read", //上传文件访问权限,有效值: private | public-read | public-read-write | authenticated-read | bucket-owner-read | bucket-owner-full-control
                    uploadDomain: "", //上传域名,http://destination-bucket.kss.ksyun.com 或者 http://kssws.ks-cdn.com/destination-bucket
                    autoStart: false, //是否在文件添加完毕后自动上传
                    onInitCallBack: function(){}, //上传初始化时调用的回调函数
                    onErrorCallBack: function(){}, //发生错误时调用的回调函数
                    onFilesAddedCallBack: function(){}, //文件添加到浏览器时调用的回调函数
                    onBeforeUploadCallBack: function(){}, //文件上传之前时调用的回调函数
                    onStartUploadFileCallBack: function(){}, //文件开始上传时调用的回调函数
                    onUploadProgressCallBack: function(){}, //上传进度时调用的回调函数
                    onFileUploadedCallBack: function(){}, //文件上传完成时调用的回调函数
                    onUploadCompleteCallBack: function(){}, //所有上传完成时调用的回调函数
                    onFilesRemovedCallback:function(){},//移除文件的callback
                    onQueueChangedCallback:function(){},
                    onFileFilteredCallback:function(){}
                };
                if (ks3PostOptions){
                    plupload.extend(this.defaultKS3Options, ks3PostOptions);
                }
                var multipartParams = {};

                if (this.defaultKS3Options.signature&&this.defaultKS3Options.policy){
                    multipartParams = {
                        "key": this.defaultKS3Options.key,
                        "acl": this.defaultKS3Options.acl,
                        "signature" : this.defaultKS3Options.signature,
                        "KSSAccessKeyId": this.defaultKS3Options.KSSAccessKeyId,
                        "policy": this.defaultKS3Options.policy
                    }
                } else {
                    multipartParams = {
                        "key": this.defaultKS3Options.key,
                        "acl": this.defaultKS3Options.acl,
                        "KSSAccessKeyId": this.defaultKS3Options.KSSAccessKeyId
                    }
                }

                this.defaultPluploadOptions = {
                    runtimes : 'html5,flash,silverlight,html4', //上传模式，依次退化;
                    url: this.defaultKS3Options.uploadDomain || "http://kssws.ks-cdn.com/destination-bucket",
                    browse_button: 'browse', //触发对话框的DOM元素自身或者其ID
                    flash_swf_url : 'js/Moxie.swf', //Flash组件的相对路径
                    silverlight_xap_url : 'js/Moxie.xap', //Silverlight组件的相对路径;
                    drop_element: undefined, //触发拖动上传的元素或者其ID
                    multipart: true,
                    multipart_params: multipartParams
                };

                if (pluploadOptions)
                    plupload.extend(this.defaultPluploadOptions, pluploadOptions);
                console.log(pluploadOptions);
                this.uploader = new plupload.Uploader(this.defaultPluploadOptions);
                this.uploader.bind("Init", this.onInit, this);
                this.uploader.bind("Error", this.onUploadError, this);

                this.uploader.bind("FilesAdded", this.onFilesAdded, this);
                this.uploader.bind("FileFiltered", this.onFileFiltered, this);

                this.uploader.bind("FilesRemoved", this.onFilesRemoved, this);
                this.uploader.bind("BeforeUpload", this.onBeforeUpload, this);
                this.uploader.bind("UploadFile", this.onStartUploadFile, this);
                this.uploader.bind("UploadProgress", this.onUploadProgress, this);
                this.uploader.bind("FileUploaded", this.onFileUploaded, this);
                this.uploader.bind("QueueChanged",this.onQueueChanged,this);
                this.uploader.init();
            };
            ks3FileUploader.prototype.onInit=function(uploader, obj){
                this.defaultKS3Options.onInitCallback&&
                this.defaultKS3Options.onInitCallback.apply(this, [uploader, obj]);
            };
            ks3FileUploader.prototype.onUploadError = function(uploader, obj) {
                console.log(uploader,obj);
                this.defaultKS3Options.onErrorCallBack&&
                this.defaultKS3Options.onErrorCallBack.apply(this, [uploader, obj]);
            };
            ks3FileUploader.prototype.onFileFiltered=function(uploader, obj){
                this.defaultKS3Options.onFileFilteredCallback&&
                this.defaultKS3Options.onFileFilteredCallback.apply(this, [uploader, obj]);
                console.log("ks3 onFileFiltered ok========");
            };
            ks3FileUploader.prototype.onFilesAdded = function(uploader, obj) {
                this.defaultKS3Options.onFilesAddedCallBack&&
                this.defaultKS3Options.onFilesAddedCallBack.apply(this, [uploader, obj]);
                console.log("ks3 onFilesAdded ok========");
                if (this.defaultKS3Options.autoStart)
                    this.uploader.start();
            };
            ks3FileUploader.prototype.onFilesRemoved = function(uploader, obj){
                console.log("ks3 onFilesRemoved========");
                this.defaultKS3Options.onFilesRemovedCallback&&
                this.defaultKS3Options.onFilesRemovedCallback.apply(this, [uploader, obj]);
            };
            ks3FileUploader.prototype.onBeforeUpload = function(uploader, obj) {
                console.log("ks3 onBeforeUpload========");
                this.defaultKS3Options.onBeforeUploadCallBack&&
                this.defaultKS3Options.onBeforeUploadCallBack.apply(this, [uploader, obj]);
            };

            ks3FileUploader.prototype.onStartUploadFile = function(uploader, obj) {
                console.log("ks3 onStartUploadFile========");
                this.defaultKS3Options.onStartUploadFileCallBack&&
                this.defaultKS3Options.onStartUploadFileCallBack.apply(this, [uploader, obj]);
            };

            ks3FileUploader.prototype.onUploadProgress = function(uploader, obj) {
                console.log("ks3 onUploadProgress========",obj);
                this.defaultKS3Options.onUploadProgressCallBack&&
                this.defaultKS3Options.onUploadProgressCallBack.apply(this, [uploader, obj]);
            };

            ks3FileUploader.prototype.onFileUploaded = function(uploader, obj, resObj) {
                console.log("ks3 onFileUploaded========");
                this.defaultKS3Options.onFileUploadedCallBack&&
                this.defaultKS3Options.onFileUploadedCallBack.apply(this, [uploader, obj, resObj]);
            };

            ks3FileUploader.prototype.onUploadComplete = function(uploader, obj) {
                console.log("ks3 onUploadComplete========");
                this.defaultKS3Options.onUploadCompleteCallBack&&
                this.defaultKS3Options.onUploadCompleteCallBack.apply(this, [uploader, obj]);
            };

            ks3FileUploader.prototype.onQueueChanged=function(uploader, obj){
                console.log("ks3 onQueueChanged========");
                this.defaultKS3Options.onQueueChangedCallback&&
                this.defaultKS3Options.onQueueChangedCallback.apply(this, [uploader, obj]);
            };
            ks3FileUploader.STATUS={
                STOPPED: 1,
                QUEUED: 1,
                UPLOADING: 2,
                FAILED: 4,
                DONE: 5,
                FILE_DUPLICATE_ERROR: -602,
                FILE_EXTENSION_ERROR: -601,
                FILE_SIZE_ERROR: -600,
                GENERIC_ERROR: -100,
                HTTP_ERROR: -200,
                IMAGE_DIMENSIONS_ERROR: -702,
                IMAGE_FORMAT_ERROR: -700,
                INIT_ERROR: -500,
                IO_ERROR: -300,
                MEMORY_ERROR: -701,
                SECURITY_ERROR: -400
            };
            export default ks3FileUploader;