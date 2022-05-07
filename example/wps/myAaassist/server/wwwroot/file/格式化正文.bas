Attribute VB_Name = "NewMacros"
Sub AutoOpen()

End Sub

Sub ����ͳ��()
' ����ͳ�� Macro
' ���� 2015/4/17 �� yanbao ����
Application.Dialogs(wdDialogToolsWordCount).Show
End Sub



Sub ��ʽ������()
' ��ʽ������ Macro
' ���� 2012/9/14 �� winnichan ����
' ���� 2015/4/11 �� yanbao �Ż�
    On Error GoTo Err_Handle
    ActiveDocument.Select
    Selection.ClearFormatting   '�����ѡ���ݵ��ı���ʽ�Ͷ����ʽ��
    With Selection.Font         '��������: ���Ρ�GB2312    ������
        .Name = "����_GB2312"
        .Size = 16
    End With
    With ActiveDocument.PageSetup   '���ұ߾�2.54���ף����±߾�2.54���ס�
        .TopMargin = CentimetersToPoints(2.54)
        .BottomMargin = CentimetersToPoints(2.54)
        .LeftMargin = CentimetersToPoints(2.54)
        .RightMargin = CentimetersToPoints(2.54)
    End With
    With Selection.ParagraphFormat  '���뷽ʽΪ���˶��룻�������Ķ�����������2���ַ�������ʱ�������У��м��Ϊ�����о࣬���ڡ�����������ĵ��������������ǰ��
        .LineSpacingRule = wdLineSpaceSingle    'ָ�������ʽ���о�,�����о�
        .Alignment = wdAlignParagraphJustify    '���˶���
        .FirstLineIndent = CentimetersToPoints(0.35)    '���������������������Ĵ�С
        .OutlineLevel = wdOutlineLevelBodyText
        .CharacterUnitLeftIndent = 0    'ָ�������������
        .CharacterUnitRightIndent = 0
        .CharacterUnitFirstLineIndent = 2   '��������2���ַ�
        .LineUnitBefore = 0
        .LineUnitAfter = 0      '����ָ������Ķκ��ࣨ��������Ϊ��λ��
        .AutoAdjustRightIndent = True   '����������ĵ�����,���Զ����������� True Ϊ��
        .DisableLineHeightGrid = False  '����������ĵ�������������� FalseΪ��
        .FarEastLineBreakControl = True
        .WordWrap = True
    End With


    
    'WordBasic.AcceptAllChangesInDoc     '���������޶�
    If ActiveDocument.Revisions.Count >= 1 Then
         ActiveDocument.AcceptAllRevisions  '
    End If
    
    With ActiveWindow.View
        .ShowRevisionsAndComments = False       '������ʾ�ۼ�
        .RevisionsView = wdRevisionsViewFinal   '��ʾ����״̬
    End With
    
    Exit Sub
Err_Handle:
    'MsgBox Err.Description + CStr(Err.Number)
    Resume Next
End Sub

