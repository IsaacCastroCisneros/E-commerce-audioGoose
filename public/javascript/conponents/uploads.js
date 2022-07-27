export default function uploads()
{
    FilePond.registerPlugin(
        FilePondPluginFileEncode,
        FilePondPluginImageResize,
        FilePondPluginImagePreview
    )
    FilePond.setOptions(
        {
            stylePanelAspectRatio:129/200,
            imageResizeTargetWidth:200,
            imageResizeTargetHeight:120
        }
    )
    
    FilePond.parse(document.body);
}

